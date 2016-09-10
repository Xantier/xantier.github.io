---
layout: post
title: Java webapps and modern frontend - Querying The World With ORM
teaser:
tags:
  - Java
  - Spring
  - Modern Frontend
permalink:
header: no
---

## Reducing the load on your boundaries

Like we know, ORMs are OK on some things but a big mistake on others.
One thing that we used to do in our data analytics world was always try to lessen the payload coming from the database to our client. We went through variations of different rowmapping techniques and pure JDBC queries. When I jumped into a code base using Spring Data JPA, I quickly grew a longing for all the techniques that weren't available easily with @Query annotation.

Luckily there is a neat feature in JPQL that let's us map queried rows to a DTO very easily.

Consider a situation where you want a id and name from an object. Let's look at two ways of doing it:

1. Retrieve the full object (and all non-lazy objects within it), retrieve Id and name from the object and save them to a DTO.
Query sent to DB is somewhat similar to:
```sql
SELECT [every column from this table and related] FROM TABLE JOIN [every related TABLE]
```
Massive query, lot's of data moving across places.

2. Retrieve fields that you want from the object and automagically respond with the correct type.
JPQL has a magic trick built in that maps fields automatically to a DTO (might be stringly typed, so be careful).
Instead of writing your query like:
```java
@Query("select e from EntityObject e")
```
you can write:
```java
@Query("SELECT new com.hallila.dto.MyDto(e.id, e.name) from EntityObject e")
```

Where MyDto is your DTO class and params within the brackets are it's constructor params.
This will create a query somewhat similar to: Select id, name from TABLE.

Simple but powerful trick to lessen the payload when querying data and moving them around. This is especially useful when you want to display data on the frontend where it is not at all smart to transfe massive amount of data.
