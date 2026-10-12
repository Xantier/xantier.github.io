---
layout: post
title: Managing Spring Integration poller programmatically.
teaser:
tags:
  - Java
  - Spring
  - Spring Integration
permalink:
header: yes
---

First off, I have to admit that I'm not a big fan of Spring Integration. I believe there are better frameworks out there doing the same type of stuff. That being said, I stumbled upon an interesting issue with one of our integrations.

We had the need to transfer a considerable amount of objects from one service to another. Because the volume was possibly quite large, a Spring Integration was the tool chosen for the task. An extra added difficulty was that the data transfer was suppose to start from a user button click. Usually these are handled through a Spring integration gateway that is very simple to plug into your existing internal services. This time though I wanted to try something different. Spring Integration has a nice poller feature that periodically retrieves the data you tell it to retrieve and passes it on through the integration chain you have configured. This poller is especially good when moving large amounts of data from one database to another or running a continuous service in small chunks. I am not quite certain it is meant to be used as a throttled way to pass items to a JMS queue but regardless of that nagging thought, that was what I used it for.

For our purposes we used a JDBC inbound-channel-adapter to query our code.

```xml
<int-jdbc:inbound-channel-adapter
        id="transferItemsInboundJdbcChannelAdapter"
        auto-startup="false"
        data-source="dataSource"
        channel="transferItemsInboundJdbcChannel"
        query="SELECT ID, NAME FROM ITEMS WHERE IDENTIFIER_COLUMN = :identier AND ITEM_TRANSFERRED = 0"
        update="UPDATE ITEMS SET ITEM_TRANSFERRED = 1 WHERE ID IN (:id)"
        row-mapper="transferItemsRequestRowMapper"
        max-rows-per-poll="${item.transfer.jdbc.max.rows}"
        select-sql-parameter-source="transferItemsSelectSqlParameterSource"
        update-sql-parameter-source-factory="updateParameterSourceFactory">
    <int:poller id="jdbcPoller" fixed-delay="${item.transfer.poller.jdbc.fixed.delay}">
        <int:advice-chain>
            <bean class="com.hallila.jussi.TransferItemAdvice">
                <constructor-arg ref="controlChannel"/>
                <constructor-arg ref="controlBusGateway"/>
            </bean>
        </int:advice-chain>
    </int:poller>
</int-jdbc:inbound-channel-adapter>
```

Lots of XML, better put your sunglasses on before your eyes start to bleed.
If we go through this guy we'll see familiar Spring Integration faces all over the place. Let's pick all the easiest berries first:
Id is the first line which is self explanatory.
Then we will turn off auto-startup, because we want to kick this off programmatically.
After that we reference our datasource so our JDBC knows where to connect to.
Next we bind our channel-adapter to a channel that we have created:

```xml
<int:channel id="transferItemsInboundJdbcChannel">
    <int:interceptors>
        <int:wire-tap channel="logger"/>
    </int:interceptors>
</int:channel>
<int:logging-channel-adapter id="logger" log-full-message="true"/>
```

It has a logger wiretapped in there. Only because without that Spring Integration is impossible to debug.

In the main config after the channel definition we have our queries. We also have a standard row mapper that maps our query results to POJOs. The first query is our select statement which is run every `${item.transfer.poller.jdbc.fixed.delay}` milliseconds and it queries `${item.transfer.jdbc.max.rows}` rows at a time. It gets it only parameter, `identifier`, from our parameter source class nicely named as `transferItemsSelectSqlParameterSource` in our Spring Integration configuration XML:

```java
public class TransferItemsParameterSource extends AbstractSqlParameterSource {

    private static final Logger LOGGER = LoggerFactory.getLogger(TransferItemsParameterSource.class);

    private static final String IDENTIFIER_PARAM_NAME = "identier";

    private Object lock = new Object();

    private Long identier;

    public void setParameters(Long identier) {
        LOGGER.debug("Set values, values: {}", identier);
        synchronized (lock) {
            this.identier = identier;
        }
    }

    @Override
    public Object getValue(String paramName) throws IllegalArgumentException {
        Object value = null;
        if (IDENTIFIER_PARAM_NAME.equals(paramName)) {
            value = identier;
        }
        return value;
    }

    @Override
    public boolean hasValue(String paramName) {
        return IDENTIFIER_PARAM_NAME.equals(paramName);
    }
}
```

Spring Integration checks from this class what the set parameter is. We set the identifier before we kick off this poller so it is available to be used.

The other parameter source is simpler, it transfers queried `ID` value to the update step of our channel-adapter. That is configured using Spring provided `ExpressionEvaluatingSqlParameterSourceFactory` class. Naturally the config is in XML:

```xml
<!-- Parameter source for update query. Take value from select query and maps it to a param -->
<bean id="updateParameterSourceFactory"
      class="org.springframework.integration.jdbc.ExpressionEvaluatingSqlParameterSourceFactory">
    <property name="parameterExpressions">
        <map>
            <entry key="id" value="#this['id']"/>
        </map>
    </property>
</bean>
```

Everything we've touched so far is only scaffolding around the actual meat, our poller. Let's take a closer look at that:

```xml
<int:poller id="jdbcPoller" fixed-delay="${item.transfer.poller.jdbc.fixed.delay}">
    <int:advice-chain>
        <bean class="com.hallila.jussi.TransferItemAdvice">
            <constructor-arg ref="controlChannel"/>
            <constructor-arg ref="controlBusGateway"/>
        </bean>
    </int:advice-chain>
</int:poller>
```

It is of type poller and has an `advice-chain` element within it. This advice chain contains a single class `TransferItemAdvice` that takes two constructor arguments. The class looks like this:

```java
public class TransferItemAdvice implements AfterReturningAdvice {
    private static final String ADAPTER = "@transferItemsInboundJdbcChannelAdapter";
    private MessageChannel controlChannel;
    private ControlBusGateway controlBusGateway;

    public TransferItemAdvice(MessageChannel controlChannel, ControlBusGateway controlBusGateway) {
        this.controlChannel = controlChannel;
        this.controlBusGateway = controlBusGateway;
    }

    /**
     * Inbound JDBC Adapter returns true/false based on if there was rows returned when polling.
     * We'll stop the adapter from polling if false returned (no rows left)
     */
    @Override
    public void afterReturning(Object o, Method method, Object[] objects, Object o2) throws Throwable {
        boolean isRunning = controlBusGateway.controlBusBooleanMethod(ADAPTER + ".isRunning()");
        if (isRunning && !(Boolean) o) {
            controlChannel.send(new GenericMessage<>(ADAPTER + ".stop()"));
        }
    }
}
```

This advice implements Spring's AfterReturningAdvice and it's only method, `afterReturning`. It also has two fields a `MessageChannel` and a `ControlBusGateway`. The actual magic happens via these two objects. The first one, control channel had the ability to send messages to our channel-adapter. ControlBusGateway is our own gateway interface that provides us the ability to take a peek into the internals of our channel-adapter. The interface has one method, that returns a boolean and is aptly named `controlBusBooleanMethod`. Therefore making the interface look like this:

```java
public interface ControlBusGateway {
    boolean controlBusBooleanMethod(String command);
}
```


These two important items are configured in our XML:

```xml
<!-- Channel and gateway to programmatically be able to control channel adapter -->
<int:channel id="controlChannel"/>
<int:control-bus input-channel="controlChannel"/>
<int:gateway id="controlBusGateway" service-interface="com.hallila.jussi.ControlBusGateway" default-request-channel="controlChannel"/>

```

And the actual stopping of our channel-adapter happens in the overridden afterReturning method. Spring Integration JDBC poller has a hidden feature where it returns a Boolean object after querying the database. If this boolean is true, it has found some rows when polling, if it is false that means that it has exhausted the query and zero rows were found. If you take a closer look at our queries you'll see that we SELECT only items that have a ITEM_TRANSFERRED flag of 0 and we update that same flag to be 1 when it has been queried by our poller.


Now that is all fine and dandy but didn't really reveal to us how we start this polling operation from our services. That is actually a very simple operation. Again we turn to our `controlChannel` and `ControlBusGateway`. We can simply `@Autowire` these two items to our service that kicks off the whole job. In this service we also set up our parameter source.

```java
@Service
public class ItemTransferringServiceImpl implements ItemTransferringService {

    private static final String ADAPTER = "@transferItemsInboundJdbcChannelAdapter";

    @Autowired
    private MessageChannel controlChannel;

    @Autowired
    private ControlBusGateway gateway;

    @Autowired
    private TransferItemsParameterSource transferItemsParameterSource;

    /**
     * Only a single activation process can be running at a time.
     */
    @Override
    public boolean transferItems(String identier) {
        boolean isRunning = gateway.controlBusBooleanMethod(ADAPTER + ".isRunning()");
        if (!isRunning) {
            transferItemsParameterSource.setParameters(identier);
            controlChannel.send(new GenericMessage<>(ADAPTER + ".start()"));
            return true;
        }
        return false;
    }
}
```



And that is how you can programmatically control your Spring Integration poller elements. With this we only query the items, the next configuration in our setup is to transform queried objects to a DTO that we pass into an outgoing channel-adapter. That channel adapter goes into a JMS queue but since that setup is fairly straightforward, I will omit it from this blog post. The most important thing, kicking off and stopping a Spring Integration poller programmatically has now been achieved.
