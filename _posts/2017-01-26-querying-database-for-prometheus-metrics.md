---
layout: post
title: Creating a Prometheus exporter to query DB data
teaser:
tags:
  - Prometheus
  - Prometheus Exporter
  - SQL
  - Kotlin
  - Spring Boot
permalink:
header: no
---

Lately I have been embarked upon a wonderful journey in the world of [Prometheus](https://prometheus.io/). Since our current monitoring solution at $DAYJOB was lagging behind of times quite a we needed a new solution to see what was going on in our application. The previous monitoring system relied heavily into our database and results of bash scripts running some DB queries periodically. The results of these were piped into Nagios which handled our alerting based on the query results.

This approach has it pitfalls. The biggest being that there is no historical data available and it is not visible at all. I decided to mimic this approach to get a quick dashboard up and running to visualize the trends and how our data was behaving. For this I needed to create a Prometheus exporter and spin up a Prometheus client and a visualization dashboard which ended up being [Grafana](http://grafana.org/).

Disclaimer.
Because of the way Prometheus handles different metrics database is usually not the best of sources for metrics data. After a long time reading [documentation about Prometheus metric types](https://prometheus.io/docs/concepts/metric_types/) I still am not quite sure what is the best one to use for database queried data. Naturally the answer depends on the actual query but in my mind I was looking for something that lets me calculate the delta between previous count. This functionality is not available in Prometheus client libraries so it should be implemented manually on the client. For our demo purposes I opted to leave that out for now and get a prototype out there quickly instead.

Lets dive into the code and see how a Prometheus Kotlin client looks like.

I chose a standard Spring Boot stack to run the application for ease of access. Prometheus provides client libraries for Java that you can integrate into your application easily. For this I was using maven and added the following lines to my pom.xml:

```xml
<dependency>
    <groupId>io.prometheus</groupId>
    <artifactId>simpleclient_spring_boot</artifactId>
    <version>${prometheus.version}</version>
</dependency>
<dependency>
    <groupId>io.prometheus</groupId>
    <artifactId>simpleclient_hotspot</artifactId>
    <version>${prometheus.version}</version>
</dependency>
<dependency>
    <groupId>io.prometheus</groupId>
    <artifactId>simpleclient_servlet</artifactId>
    <version>${prometheus.version}</version>
</dependency>
```

Since we were using Spring Boot and Prometheus provides a library to get information about the application itself we got a freebie metrics of our simple exporter as well. The application configuration initializes metrics collector for Spring Boot and creates a servlet to expose an endpoint where our Prometheus client can query the data from. Our Application config looks like this:

```ruby
@SpringBootApplication open class App : WithLogging() {
    companion object {
        @JvmStatic fun main(args: Array<String>) {
            SpringApplication.run(App::class.java, *args)
        }
    }

    @Bean
    open fun springBootMetricsCollector(publicMetrics: Collection<PublicMetrics>): SpringBootMetricsCollector {
        val springBootMetricsCollector = SpringBootMetricsCollector(publicMetrics)
        springBootMetricsCollector.register<Collector>()
        return springBootMetricsCollector
    }

    @Bean
    open fun servletRegistrationBean(): ServletRegistrationBean {
        DefaultExports.initialize()
        return ServletRegistrationBean(MetricsServlet(), "/metrics")
    }
}
```

As we can see endpoint called `/metrics` will be the place where our data is available.

That is all fine and dandy but we needed more data as well. This time from our database. Since the simplest thing to do is to drop in a Spring Boot JDBC and start hitting the database, I decided to do that. After adding another entry to `pom.xml` we have mostly everything we need to create a DB query and display those results as a metric for Prometheus.

Because it is nice to have an externalized configuration that was my plan as well. The solution here was to fetch needed queries from filesystem and run those automatically using Spring's `@Scheduled` annotation. First step was to load external query files and map those into objects. For this YAML seemed like a good option and Jackson was the tool to do the serialization. I bound this to applicaiton startup and tried to load all files into memory immediately with fail fast principle. Another Spring bean configuration:

```ruby

    @Bean
    open fun monitoringQueries(): List<MonitoringQuery> {
        val returnable = ArrayList<MonitoringQuery>()
        val mapper = ObjectMapper(YAMLFactory()).registerKotlinModule()
        try {
            val pathname = "./queries/"
            val files = File(pathname).listFiles()
            files.filter { it.isFile }
                .mapTo(returnable) { mapper.readValue<MonitoringQuery>(File(pathname + it.name)) }
        } catch (e: Exception) {
            log.error("Failed to parse query files.", e)
        }
        return returnable
    }
```

The MonitoringQuery data class looks like this:

```ruby
data class MonitoringQuery(
    val type: MonitoringType,
    val name: String,
    val labels: List<String>,
    val query: String,
    val description: String
)
```
And the config file matches those fields:

```YAML
name: amount_of_users
description: Gauge to how many users are in the database
type: gauge
labels:
  - 'registration_type'
  - 'age_bracket'

query: |
  SELECT
  source as registration_type,
  age_bracket,
  count(*) as amount
  FROM USER
  GROUP BY source, age_bracket
  ORDER BY source, age_bracket

```


Now that we had all the info for individual queries we could make our metric collectors. We created a collection of collectors for each type of metric Prometheus supports.

```ruby
@Bean
open fun gauges(): List<GaugeQuery> =
  monitoringQueries
      .filter({ it -> it.type === MonitoringType.GAUGE })
      .map({ it ->
          GaugeQuery(Gauge.build()
              .name(it.name)
              .help(it.description)
              .labelNames(*it.labels.toTypedArray())
              .register(), it)
      })
```

The data class for GaugeQuery is just a simple wrapper of our MonitoringQuery object and Prometheus client Gauge class.

```ruby
interface PrometheusQuery {
    val monitoringQuery: MonitoringQuery
}
data class GaugeQuery(val gauge: Gauge, override val monitoringQuery: MonitoringQuery) : PrometheusQuery
```

Notice how in our query we have 3 columns but the config file exposes only two labels. This is the way Prometheus client handles these metrics. We create one and attach multiple labels to it. When we increment the value of that particular collector we attach the values of those labels (in the same order) and lastly increment the value. Here is my solution for that:

```ruby
data class QueryResult(val labelValues: List<String>, val value: Long)

@Scheduled(fixedRateString = "\${query.interval.gauge}")
fun queryGauge() {
    gauges.forEach(runQuery<GaugeQuery> { query, res -> query.gauge.labels(*res.labelValues.toTypedArray()).inc(res.value.toDouble()) })
}

private fun <T : PrometheusQuery> runQuery(populateMetric: (T, QueryResult) -> Unit): (T) -> Unit {
    return { it ->
        log.info("Running Query: {}", it.monitoringQuery.query)
        log.info("Creating data for {}: {} - {}", it.monitoringQuery.type, it.monitoringQuery.name, it.monitoringQuery.description)
        jdbcTemplate.query(it.monitoringQuery.query, mapRow(it)).forEach { res ->
            populateMetric(it, res)
        }
    }
}

private fun mapRow(it: PrometheusQuery): RowMapper<QueryResult> {
    return RowMapper { rs, i ->
        val labelValues = it.monitoringQuery.labels
            .map { s ->
                try {
                    rs.getString(s)
                } catch (e: SQLException) {
                    log.error("Failed to run query", e.errorCode)
                    ""
                }
            }
        QueryResult(labelValues, rs.getLong(it.monitoringQuery.labels.size + 1))
    }
}
```

As you can see we use `@Scheduled` to run this and get the interval value from application properties.  We take all of our (injected) gauges and run the query for them. We map returned results to a QueryResult class that holds a list of labels and the actual numeric value we want from the database. And finally we use that QueryResult to populate our metric with the label values and the actual numeric value.

This simple client taught me quite a bit about Prometheus and how to set that up. In hindsight a better solution for data gathering would have been to calculate the delta of previous and current value instead of using absolute numbers. The added benefit of this would be much bigger possibilities to use Prometheus' query language which gives us lots more opportunities to graph and alert on our data. Maybe the next iteration of the client will do that instead.

The source code for this application can be found from [Github repo](https://github.com/Xantier/prometheus-db-exporter). As always, pull requests are more than welcome.
