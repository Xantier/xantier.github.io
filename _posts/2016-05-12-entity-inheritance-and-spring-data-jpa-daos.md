---
layout: post
title: Entity Inheritance and Spring Data JPA DAOs
teaser:
tags:
  - Java
  - Spring
permalink:
header: no
---

Something I stumbled upon over my latest story that might be of use in the future.

When we have the perfect storm of entities inheriting with a discriminator column:

```java
@Entity
@Table(name = "T_TABLE")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(columnDefinition = "TYPE", name = "TYPE")
public class Parent{
/**snip**/
}

/**snip**/
@DiscriminatorValue(value = "TYPE1")
public class Type1Entity extends Parent {
/**snip**/
}


/**snip**/
@DiscriminatorValue(value = "TYPE2")
public class Type2Entity extends Parent {
/**snip**/
}
```

How do we create our Spring Data repos for these guys?
1. Creating repository classes, managing things manually
2. Extending Magic Repository interfaces.

Option 2 is actually possible to do with some intelligent typing on those interfaces. We need  to create a few of them but in the end it allows us to use the Magic on these fellows as well:

First a read only base repository that contains our common queries:
```java
@NoRepositoryBean //Read-Only
public interface BaseParentDAO<EntityType extends Parent> extends CrudRepository<EntityType, Long> {

    @Query("select e from #{#entityName} e") // #{#entityName} will be magically replaced by type arguments in children
    List<EntityType> findThemAll();
}
```

Then we can create one to query all items, both Type1Entity and Type2Entity:
```java
public interface ParentDAO extends BaseParentDAO<Parent>, CrudRepository<Parent, Long> {
    // Everything from base inherited
}
```

And repos for our children as well:
```java
public interface Type1EntityDAO extends BaseParentDAO<Type1Entity>, CrudRepository<Type1Entity, Long> {
    // Everything from base inherited
}

public interface Type2EntityDAO extends BaseParentDAO<Type2Entity>, CrudRepository<Type2Entity, Long> {
    // Everything from base inherited
}
```

And that is all we need.

This way you can use different daos based on what you want to query: all of them, all of type ones or all of type twos.
With this approach you also gain type safety for saving/updating since you need to use the correct DAO to make it compile.
