Application context:

```xml
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="flyway" class="ie.brandtone.b2bl.config.PropertyOptionalFlyway" init-method="migrate">
        <property name="migrationEnabled" value="${flyway.migration.enabled}"/>
        <property name="locations" value="classpath:DB/migrate/"/>
        <property name="dataSource" ref="dataSource"/>
        <property name="table" value="T_VERSIONS"/>
        <property name="cleanDisabled" value="true"/>
        <property name="sqlMigrationPrefix" value="V_"/>
        <property name="sqlMigrationSeparator" value="__"/>
        <property name="baselineOnMigrate" value="${flyway.migration.baselineOnMigrate}"/>
    </bean>
</beans>
```

Properties:
```
flyway.migration.enabled=false
flyway.migration.baselineOnMigrate=true
```

Extended Flyway configuration class:

```java

public class PropertyOptionalFlyway extends Flyway {

    private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    private Boolean migrationEnabled;

    @Override
    public int migrate() throws FlywayException {
        if (migrationEnabled) {
            LOGGER.info("Running Flyway migration");
            return super.migrate();
        } else {
            LOGGER.info("Flyway migration turned off. Skipping automated migration scripts.");
            return 0;
        }
    }

    @Override
    public void clean() {
        // Just in case :)
        // do nothing
    }

    public void setMigrationEnabled(Boolean migrationEnabled) {
        this.migrationEnabled = migrationEnabled;
    }
```

pom.xml:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>b2bl</artifactId>
        <groupId>ie.brandtone.b2bl</groupId>
        <version>1.15.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>b2bl-db</artifactId>
    <properties>
        <properties.maven.version>1.0.0</properties.maven.version>
    </properties>


    <dependencies>

        <!-- Database migrations -->
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-core</artifactId>
            <version>4.0.3</version>
        </dependency>
    </dependencies>
    <build>
        <resources>
            <resource>
                <directory>DB/migrate</directory>
                <targetPath>${basedir}/target/classes/DB/migrate</targetPath>
                <filtering>true</filtering>
            </resource>
            <resource>
                <directory>src/main/resources/</directory>
                <targetPath>${basedir}/target/classes/</targetPath>
                <filtering>true</filtering>
            </resource>
        </resources>
    </build>
</project>
```

