Generic Builder:

```java
public abstract class BuildableBuilder<T> implements Buildable<T>{

    public static <T> T a(Buildable<T> o) {
        return o.build();
    }

    public static <T> T an(Buildable<T> o) {
        return a(o);
    }

    public static <T> T tryBuild(Buildable<T> source, T dest) {
        try {
            copy(source, dest);
        } catch (IllegalAccessException | NoSuchFieldException e) {
            e.printStackTrace();
        }
        return dest;
    }

    public static <T> List<T> listOf(Buildable<T>... items){
        List<T> returnable = new ArrayList<>();
        for (Buildable<T> item : items) {
            returnable.add(item.build());
        }
        return returnable;
    }

    public static <T1, T2> void copy(T1 source, T2 dest) throws IllegalAccessException, NoSuchFieldException {
        Field[] fromFields = source.getClass().getDeclaredFields();
        for (Field field : fromFields) {
            Object value = field.get(source);
            try {
                final Method method = dest.getClass().getMethod("set" + StringUtils.capitalize(field.getName()), field.getType());
                method.invoke(dest, value);
            } catch (NoSuchMethodException | InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }
}
```

Simple interface for building:

```java
public interface Buildable<T> {
    T build();
}
```

Usage: 

```java
public class QuestionBuilder extends AbstractBuilder<Question> implements Buildable<Question> {

    protected String reportLabel;

    public static QuestionBuilder question() {
        return new QuestionBuilder();
    }

    public QuestionBuilder reportLabel(String reportLabel) {
        this.reportLabel = reportLabel;
        return this;
    }

    @Override
    public Question build() {
        return tryBuild(this, new Question());
    }
}
```

Naturally the downsides for this are that it is not safe against modifications in the original POJO.


