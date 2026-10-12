export interface Book {
  slug: string
  title: string
  author: string
  rating: string
  genre: string[]
  link: string
  review: string
}

export const books: Book[] = [
  {
    "slug": "algorithms-unlocked",
    "title": "Algorithms unlocked",
    "author": "Thomas Cormen",
    "rating": "3/5",
    "genre": [
      "Software Engineering",
      "Algorithms"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0262518805/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0262518805&linkCode=as2&tag=jussihallilac-21",
    "review": "Good introductory book to algorithms if that is you cup of tea. Tries it's best to be approachable and easy to understand and does a decent job on it. Goes through sorting, Acyclic Graphs, Shortest Paths and Cryptography. Apart from exercises trying to found exploitable arbitrage in Bitcoin exchanges (Bellman-Ford) I haven't found much use on the techniques from this book."
  },
  {
    "slug": "angularjs",
    "title": "Angular JS",
    "author": "Brad Green / Shyam Seshadri",
    "rating": "2/5",
    "genre": [
      "Javascript",
      "AngularJS"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1491901942/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1491901942&linkCode=as2&tag=jussihallilac-21",
    "review": "A basic short book on AngularJS. Goes through Controllers, Services and Directives as well as communication patterns with an API. The most helpful section on the book was in the beginning where an anatomy of an Angular application was explained. It might be good as a first resource on Angular but not much further. For me the book became too late and did not reveal much extra compared to articles and blog posts found on the internet before reading this."
  },
  {
    "slug": "art-of-agile-development",
    "title": "Art of Agile Development",
    "author": "James Shore / Share Warden",
    "rating": "4/5",
    "genre": [
      "Agile Methodology",
      "XP / Extreme Programming"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0596527675/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0596527675&linkCode=as2&tag=jussihallilac-21",
    "review": "I love agile and feel frustrated most of the time when companies I work for fall into old patterns of heavyweight processes. Goes through corner stones of XP and all the useful practices that come with it. Was the initial spark for me to take a closer look to TDD. Luckily the book is not poisoned with consult talk on methodologies and keeps itself pure and on topic. Excellent, excellent book about agile development, can't recommend enough."
  },
  {
    "slug": "art-of-the-start",
    "title": "Art of the Start",
    "author": "Guy Kawasaki",
    "rating": "3/5",
    "genre": [
      "Career",
      "Entrepreneurism"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1591840562/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1591840562&linkCode=as2&tag=jussihallilac-21",
    "review": "A classic book on startup circles about entrepreneurism and building your own business. Did not hit a home run with me and the tactics recommended in the book were at times a bit out of my reach. Could be that the timing wasn't correct for me to read this title but in the end I did not get much out of it. I still believe this is a recommendable book to people in the process of spinning up a business."
  },
  {
    "slug": "category-theory",
    "title": "Category Theory for Programmers",
    "author": "Bartosz Milewski",
    "rating": "4/5",
    "genre": [
      "Mathematics",
      "Category Theory",
      "Functional Programming"
    ],
    "link": "https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/",
    "review": "While spiraling down into functional programming more and more I, like many others, stumbled upon categroy theory. Looking for a good explanation what does it actually mean has been tough but so far the closest I have gotten to understand is due to Bartosz Milewski and his book and videos. Excellent quality, explains things very well. The topic is very difficult but Milewski is able to shed some light into the mathematical world and theories behind functional programming patterns."
  },
  {
    "slug": "clean-code",
    "title": "Clean Code",
    "author": "Robert C. \"Uncle Bob\" Martin",
    "rating": "5/5",
    "genre": [
      "Software Engineering",
      "Code Quality",
      "Software Craftsmanship"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0132350882/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0132350882&linkCode=as2&tag=jussihallilac-21",
    "review": "This book is probably one of my all time favourites. The information within these covers is invaluable to all developers. The book explains why code quality is important and the notion of software craftsmanship, being proud of your creations and the ideas of code smells . Even though the book was written using Java in code examples the meaning of it goes well beyond that. All the essential structures of good looking code that is easy pleasant to work with is touched in the book. This one is probably the one I would recommend the most to developers jumping into the industry and I definitely have hoped many times that my coworkers would own a copy of this. Classic."
  },
  {
    "slug": "clean-coder",
    "title": "Clean Coder",
    "author": "Robert C. \"Uncle Bob\" Martin",
    "rating": "5/5",
    "genre": [
      "Career",
      "Professionalism"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0137081073/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0137081073&linkCode=as2&tag=jussihallilac-21",
    "review": "Continuation to Uncle Bob's Clean Code, this time touching the career aspect of software engineering. Goes through the needed behaviours in a workplace. Explains about why professionalism is important and outlines the steps how to achieve that. The book contains more or less everything a developer needs to thrive in a workplace when one is not on his IDE going through the codebase (though that part is mentioned as well). Another book I can wholeheartedly recommend."
  },
  {
    "slug": "code-complete-2",
    "title": "Code Complete 2",
    "author": "Steve McConnell",
    "rating": "4/5",
    "genre": [
      "Software Engineering"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0735619670/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0735619670&linkCode=as2&tag=jussihallilac-21",
    "review": "A classic book recommended by many, if not most, software developers. Explains every aspect about code starting from basic variable namings to complex build and testing systems. Unfortunately for me the book came a little bit too late on my career so I was mostly nodding along when reading through the pages on this book. The content is brilliant, though at times a little bit in need of an update. This is one of those books that you would really want to buy for the intern or just graduated coworker, they will learn loads from this one."
  },
  {
    "slug": "design-it",
    "title": "Design It!",
    "author": "Michael Keeling",
    "rating": "3/5",
    "genre": [
      "Software Engineering",
      "Software Architecture",
      "Software Leadership"
    ],
    "link": "https://www.amazon.com/Design-Programmer-Architect-Pragmatic-Programmers/dp/1680502093",
    "review": "Design it was a somewhat interesting book to read. It outlines the aspects what makes one a software architect and how we in essence have software architects in teams already, regardless of the title itself. The most interesting part of this book for me was its focus on communication patterns between architects and various stakeholders; other devs, clients and the system itself. The book closes out with a catalogue of exercises that can be arranged within a company to improve this communication and information sharing. The technical bits in the book are somewhat slim, which is understandable considering that it rather creates an overview of the role of an architect rather than the end result of software architecture."
  },
  {
    "slug": "design-patterns",
    "title": "Design Patterns",
    "author": "Gamma / Helm / Johnson / Vlissides",
    "rating": "3/5",
    "genre": [
      "Software Engineering",
      "Design Patterns"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0201633612/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0201633612&linkCode=as2&tag=jussihallilac-21",
    "review": "Legendary Design Patterns by the Gang of Four. The nature of the book makes it somewhat hard to read since in the end it is a catalogue of patterns that you can utilize in your object oriented code. Don't get me wrong, I have opened the pages on this book probably more times than any other one in my bookshelf but that has been mostly to check the list of patterns from the first page and then continue search the implementation of that pattern from the internet. Somewhat labourious read due to the structure but is one of the classics so needs to sit in the bookshelf of every proud developer."
  },
  {
    "slug": "developer-hegemony",
    "title": "Developer Hegemony",
    "author": "Eric Dietrich",
    "rating": "4/5",
    "genre": [
      "Software Engineering",
      "Career"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0262518805/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0262518805&linkCode=as2&tag=jussihallilac-21",
    "review": "At time cynical, depressing and definitely thought provoking book. Paints a beautiful picture of the future of our industry from a developers point of view. The suddenly outlines the software industry, career paths and progressions and the cut-throat world of corporate developers life, before eventually settling into actual advice how to get good, how to advance ones career and how to find happiness as a software developer. Definitely recommendable."
  },
  {
    "slug": "domain-driven-design",
    "title": "Domain Driven Design",
    "author": "Eric Evans",
    "rating": "4/5",
    "genre": [
      "Software architecture",
      "Software Design",
      "DDD",
      "Bounded Context"
    ],
    "link": "https://www.amazon.co.uk/gp/product/B00794TAUG/ref=as_li_tl?ie=UTF8&tag=jussihallilac-21&camp=1634&creative=6738&linkCode=as2&creativeASIN=B00794TAUG&linkId=0fb9331d387257650870835dfa50b7d9",
    "review": "A classic book on designing your domain entities within your application. A good book to read through especially at this day and age of increased drive towards modularity and componentization. Book itself contains a good amount of nice examples and use cases from real life, both successful and some missteps. For me this started a bit slowly but especially the penultimate chapter around bounded context gave some nice hints to mold thought processes. The book is a good companion for people who spend lot of time of their days huddled around white boards trying to come up with perfect designs."
  },
  {
    "slug": "effective-java",
    "title": "Effective Java",
    "author": "Joshua Bloch",
    "rating": "5/5",
    "genre": [
      "Java",
      "Patterns",
      "Best Practices"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0321356683/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0321356683&linkCode=as2&tag=jussihallilac-21",
    "review": "A book containing patterns and tidbits how to write good or brillian Java code. Goes through the essential parts of the language and explains why and how it can be used effectively. While working with Java I usually end up going through writings of the author quite a bit since his collections library in the JDK is probably the most elegant piece of code within every project I lay my hands on. Every person writing Java should read this book."
  },
  {
    "slug": "effective-javascript",
    "title": "Effective Javascript",
    "author": "David Herman",
    "rating": "3/5",
    "genre": [
      "Javascript",
      "Patterns",
      "Best Practices"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0321812182/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0321812182&linkCode=as2&tag=jussihallilac-21",
    "review": "Javascript edition of the effective series. Goes through the basic language constructs and explains very well what users of the language should really know about it. Touches the aspects of issues within the language and how to work with them or around them. Unfortunately the book is somewhat outdated in the landscape of fast moving language."
  },
  {
    "slug": "eloquent-javascript",
    "title": "Eloquent Javascript",
    "author": "Martijn Haverbecke",
    "rating": "4/5",
    "genre": [
      "JavaScript"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1593275846/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1593275846&linkCode=as2&tag=jussihallilac-21",
    "review": "An excellent introductory book to the language of Javascript. When peope ask for recommendations of a Javascript book this is the one I usually recommend if I feel that the reader is starting out with programming. Starts with the basics and builds on top of that. I probably wouldn't recommend this as a first JS book if you know programming already but for a somewhat novice developer this is one of the best you can get."
  },
  {
    "slug": "functional-javascript",
    "title": "Functional Javascript",
    "author": "Michael Fogus",
    "rating": "5/5",
    "genre": [
      "Javascript",
      "Functional Programming"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1449360726/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1449360726&linkCode=as2&tag=jussihallilac-21",
    "review": "This book made me finally understand the beauty of functional programming and why we should seek to understand that. Goes through functional Javascript programming with Underscore. Touches all the important aspects of functional day-to-day programming and explains them very well and understandably. Since the language is moving fast the book is quickly becoming outdated but for now (Sept 2016) it is still definitely worth the read."
  },
  {
    "slug": "functional-programming-in-scala",
    "title": "Functional Programming in Scala",
    "author": "Paul Chiusano / Rúnar Bjarnason",
    "rating": "5/5",
    "genre": [
      "Scala",
      "Functional Programming"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1617290653/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1617290653&linkCode=as2&tag=jussihallilac-21",
    "review": "The red Scala book. Very challenging but also so rewarding. The book will teach you functional programming if you go through the exercises. For me this title was able to tilt my head in a way that I understood the core concepts of functional style in Scala. The exercises in the book are a must do if you want to keep up with the content. If the exercises are done, it is guaranteed that you will finish this book as a better developer. For people already writing nearly fuctional code and wanting to take themselves to the next level - get this book, this will definitely take you there."
  },
  {
    "slug": "functional-thinking",
    "title": "Functional Thinking",
    "author": "Neal Ford",
    "rating": "4/5",
    "genre": [
      "Software Engineering",
      "Functional Programming"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1449365515/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1449365515&linkCode=as2&tag=jussihallilac-21",
    "review": "Good mindset shifting book on functional programming. For me this title helped to understand the differences between imperative and functional styles of programming. The book goes through functional programming with Java and other JVM languages (Scala/Groovy). It is a good introductory book on functional paradigm for people coming from Java background."
  },
  {
    "slug": "growing-object-oriented-software-guided-by-tests",
    "title": "Growing Object Oriented Software Guided by Tests",
    "author": "Nat Pryce / Steve Freeman",
    "rating": "4/5",
    "genre": [
      "Software Engineering",
      "TDD"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0321503627/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0321503627&linkCode=as2&tag=jussihallilac-21",
    "review": "A big case study book on TDD. Most of the book consists of writing a good sized program using test driven development. The content in the book is top notch though it suffers a little bit because of the book form. This would be an excellent crash course to TDD if the book is read out loud by someone while coding along with the book. Very good book for people looking to take their TDD to the next level."
  },
  {
    "slug": "guidelines-for-online-success",
    "title": "Guidelines for Online Success",
    "author": "Rob Ford / Julies Wiedeman",
    "rating": "1/5",
    "genre": [
      "UI/UX",
      "Online Marketing"
    ],
    "link": "https://www.amazon.co.uk/gp/product/3836528126/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=3836528126&linkCode=as2&tag=jussihallilac-21",
    "review": "A book with a lot of images showing websites and how they have been designed. Some points touching what makes a good \"guideline for success\" but in the end the content is much more readily available online. Might be a good for landing pages or advertisements, for me not much use."
  },
  {
    "slug": "haskell-programming-from-first-principles",
    "title": "Haskell Programming from First Principles",
    "author": "Christopher Allen / Julie Moronuki",
    "rating": "5/5",
    "genre": [
      "Haskell",
      "Functional Programming"
    ],
    "link": "http://www.haskellbook.com/",
    "review": "Chris Allen is the person to go to when one wants to learn more about Haskell. This book starts from the basics and increases difficulty in a well structured, easily followable manner. Since the book really goes through things from First Principles, it also introduces a lot of ways to unlearn things. A quality that is definitely needed when one wants to venture into Haskell from C-based languages. Easily the best book on Haskell."
  },
  {
    "slug": "head-first-design-patterns",
    "title": "Head First Design Patterns",
    "author": "Eric Freeman / Elisabeth Freeman",
    "rating": "4/5",
    "genre": [
      "Software Engineering",
      "Design Patterns"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0596007124/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0596007124&linkCode=as2&tag=jussihallilac-21",
    "review": "The entrypoint to design patterns. Witty and funny way of teaching about OO and design patterns. Goes through most used design patterns and show good variety of examples on use cases for these patterns. Makes the patterns easy to understand and grasp so the book reaches its goal wonderfully. This is the book to get in case you want to get a firmer knowledge of design patterns."
  },
  {
    "slug": "head-first-object-oriented-analysis-and-design",
    "title": "Head First Object Oriented Analysis and Design",
    "author": "Brett McLaughlin / Gary Pollice / David West",
    "rating": "2/5",
    "genre": [
      "Software Engineering",
      "Object Oriented Programming"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0596008678/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0596008678&linkCode=as2&tag=jussihallilac-21",
    "review": "OO analysis and design side of head first series. For me the content didn't bring much new to the table since most of the things were very familiar from university years. I like the concept of head first series which makes the book easily approachable. This could be a good read for people not so familiar with the subject, for me it was a little bit of waste."
  },
  {
    "slug": "html5",
    "title": "HTML5: The Missing Manual",
    "author": "Matthew MacDonald",
    "rating": "2/5",
    "genre": [
      "CSS/HTML",
      "Web development"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1449363261/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1449363261&linkCode=as2&tag=jussihallilac-21",
    "review": "Very introductory book about \"new\" aspects in HTML5. I bought the book to mostly have something to browse on while on an airplane. Since the topic is touching only an overview of HTML5 features the book is somewhat beginnery levelish. Few interesting tidbits around offline storage and proper usage of semantic tags were interesting. Other than those, most text was more or less skimmed through."
  },
  {
    "slug": "information-dashboard-design",
    "title": "Information Dashboard Design",
    "author": "Stephen Few",
    "rating": "2/5",
    "genre": [
      "UI/UX",
      "Dashboards"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1938377001/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1938377001&linkCode=as2&tag=jussihallilac-21",
    "review": "A catalogue of visual dashboards and what makes them good on the eye. I bought this to help design information dashboards in a way that the important data could be easily grasped from them. In the end the book didn't see much usage. Few turned pages here and there to get some inspiration on design and that ended up being the full lifecycle of this title. Maybe a good buy if you are really struggling to find inspiration, in reality internet might be a better option."
  },
  {
    "slug": "java-8-in-action",
    "title": "Java 8 In Action",
    "author": "Raoul-Gabriel Urma / Mario Fusco / Alan Mycroft",
    "rating": "3/5",
    "genre": [
      "Java",
      "Java 8"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1617291994/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1617291994&linkCode=as2&tag=jussihallilac-21",
    "review": "A good listing of new features in Java 8. Explains thoroughly the new streams API and usage of Lambdas around your codebase. Touches Optional and how that can be used and talks a little bit about async programming with Java 8. I enjoyed the chapters of how to shift into functional style thinking in Java 8, though so much more could be said on that. This is probably a good introductory book on the new features of Java 8 for people not so familiar with functional programming concepts. It doesn't go too deep into the paradigm but touches it on the surface which is a good compromise for this kind of book. In the end the book is a good fit for developers jumping to the next JDK from previous versions."
  },
  {
    "slug": "java-for-programmers",
    "title": "Java for Programmers",
    "author": "P. Deitel / H. Deitel",
    "rating": "1/5",
    "genre": [
      "Java"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0137001290/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0137001290&linkCode=as2&tag=jussihallilac-21",
    "review": "Very beginnery book about Java and development on the language. Not much used other than superficial skim through session."
  },
  {
    "slug": "javascript-allonge",
    "title": "Javascript Allonge",
    "author": "Reginald Brathwaite",
    "rating": "4/5",
    "genre": [
      "Javascript",
      "Functional Programming"
    ],
    "link": "https://www.amazon.co.uk/gp/product/B00FLKRCVO/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=B00FLKRCVO&linkCode=as2&tag=jussihallilac-21",
    "review": "The Javascript book that sparked me to the trip down the rabbit hole of functional programming. Very interesting concepts about functions in Javascript and usages of them I had not thought of. To me this is one of the best Javascript books out there that captures the current paradigm shift to more functional style of programming in this language."
  },
  {
    "slug": "javascript-patterns",
    "title": "Javascript Patterns",
    "author": "Stoyan Stefanov",
    "rating": "3/5",
    "genre": [
      "Javascript",
      "Patterns",
      "Best Practices"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0596806752/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0596806752&linkCode=as2&tag=jussihallilac-21",
    "review": "Javascript Patterns goes through a lot starting from basic object creations and functions to a GoF style design patterns. The first part of the book is somewhat basic and not bringing that much new to the table, at least for me. The second half brings in some interesting things and I like that the book touches DOM handling and proper practices to use your JS files in a browser environment. This is a good read, though a little bit all over the place and with a little bit too many skippable parts."
  },
  {
    "slug": "javascript-spessore",
    "title": "Javascript Spessore",
    "author": "Reginald Brathwaite",
    "rating": "3/5",
    "genre": [
      "Javascript",
      "Object Oriented Programming"
    ],
    "link": "https://leanpub.com/javascript-spessore",
    "review": "The other caffeinated Javascript book. This is very tightly coupled with Javascript Allonge and works very well as a yang to allonge's yin. Spessore is more about objects and how those are, or should be handled in Javascript and how we can utilize them fully when writing in this language. Excellent book, though a tiny bit behind Javascript Allonge."
  },
  {
    "slug": "lean-startup",
    "title": "Lean Startup",
    "author": "Eric Ries",
    "rating": "4/5",
    "genre": [
      "Career",
      "Entrepreneurism"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0670921602/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0670921602&linkCode=as2&tag=jussihallilac-21",
    "review": "The book most people recommend when looking for a path to the entrepeneurial life. Lean Startup is a good starting point to read on that journey. It outlines most of the important aspects and techniques that can be used. Most of the things I got out of this book was a some kind of mindset shift towards more iterative style of developing myself and products I work on. It is a really good read and I would recommend it to everyone interested in the subject . Somehow I have a feeling that it could have been much better or that there are better books around the topic out there."
  },
  {
    "slug": "learn-you-a-haskell-for-great-good",
    "title": "Learn You a Haskell for Great Good",
    "author": "Miran Lipovaca",
    "rating": "4/5",
    "genre": [
      "Haskell",
      "Functional Programming"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1593272839/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1593272839&linkCode=as2&tag=jussihallilac-21",
    "review": "My first touch to Haskell. This book was a breath of fresh air in the category of books teaching programming languages. Very funnily written as well as educational. The whole concept around the topic was brilliantly executed and taught me a massive amount of new knowledge on a difficult topic. As an originally imperative style student some parts were difficult to grasp but that is not the books' fault. Could've used a little bit of exercises but in general a brilliant introduction to Haskell."
  },
  {
    "slug": "learning-reactive-programming-with-java-8",
    "title": "Learning Reactive Programming With Java 8",
    "author": "Nickolay Tsvetinow",
    "rating": "4/5",
    "genre": [
      "Java",
      "Reactive Functional Programming",
      "RX"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1785288725/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1785288725&linkCode=as2&tag=jussihallilac-21",
    "review": "Short-ish introduction to Reactive programming and operators that can be used when building reactive pipelines. Goes through the basic concepts fairly well and touches a good amount of different approaches one might want to take when working with observables. Could use a little bit more of mindshift type of topics explaining in more detail the reasoning behind the whole reactive streams movement and when one should jump on that and when not. All in all this book is a good introduction to RX and worth checking out."
  },
  {
    "slug": "mostly-adequate-guide-to-functional-programming",
    "title": "Professor Frisby's Mostly Adequate Guide to Functional Programming",
    "author": "Brian Lonsdorf",
    "rating": "4/5",
    "genre": [
      "Javascript",
      "Functional Programming"
    ],
    "link": "https://drboolean.gitbooks.io/mostly-adequate-guide/content/",
    "review": "Brialliant little Gitbook about functional programming in Javascript. Dr. Boolean's way of writing makes to whole thing a huge pleasure to read and exercises at the end of each chapter match very well the topic at hand. This book gave me a much greater insight on binding and chaining, as well as how to handle wrappedd objects in a functional way. Also the content on composing was excellently written and that alone makes the book worth opening up. Very good, hopefully the author has time to continue the series with more chapters."
  },
  {
    "slug": "passionate-programmer",
    "title": "Passionate Programmer",
    "author": "Chad Fowler",
    "rating": "5/5",
    "genre": [
      "Career",
      "Professionalism"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1934356344/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1934356344&linkCode=as2&tag=jussihallilac-21",
    "review": "One of my career defining books. I really really enjoyed the teachings from this title. Goes through the softer side of software development in a succinct and fast paced form. Touches all the important topics on how you should manage and develop your career and what kind of moves you should make on the journey towards software craftsmanship. Gives you good guidelines and thinking points about behaviour in and outside of your $DAYJOB. One of my favourite books about career in the software industry."
  },
  {
    "slug": "pragmatic-programmer",
    "title": "Pragmatic Programmer",
    "author": "Andrew Hunt",
    "rating": "5/5",
    "genre": [
      "Software Engineering",
      "Code Quality",
      "Software Craftsmanship"
    ],
    "link": "https://www.amazon.co.uk/gp/product/020161622X/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=020161622X&linkCode=as2&tag=jussihallilac-21",
    "review": "A classic. If you are only able to read one book about software development, it should probably be this one. Goes through all the important aspects around professionalism, software craftsmanship and code quality. Has a big, big influece on my view how I look at software development as an industry and career. Can't really recommend this book enough."
  },
  {
    "slug": "professional-javascript-for-web-developers",
    "title": "Professional Javascript for Web Developers",
    "author": "Nicholas C. Zakas",
    "rating": "5/5",
    "genre": [
      "Javascript",
      "Web Development"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1118026691/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1118026691&linkCode=as2&tag=jussihallilac-21",
    "review": "The book that introduced proper Javascript to me. Goes through everything on the language starting from basic constructs and ending up in complex DOM manipulation cases. Nicholas Zakas definitely knows what he is talking about and has crafted the book in perfect order. The level of difficulty creeps up slowly and keeps the reader on their toes while handing in helpful snippets to show how good of a language Javascript, against all odds, can actually be. Definitely recommend."
  },
  {
    "slug": "programming-in-scala",
    "title": "Programming in Scala",
    "author": "Martin Odersky",
    "rating": "4/5",
    "genre": [
      "Scala"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0981531687/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0981531687&linkCode=as2&tag=jussihallilac-21",
    "review": "Heavy and thick book on Scala. The book covers everything around the core Scala language and explains in detail core concepts around both object oriented and functional parts of Scala. What I found most interesting in this were the insights on why a language feature was implemented in such a way and what the thought process was behind such and such approach. The book really does an in depth analysis why the design decisions were made that way and also what approaches one would take when using Scala. The book is brilliant and will teach everyone reading it a lot, about Scala and about programming in general."
  },
  {
    "slug": "quality-code",
    "title": "Quality Code",
    "author": "Stephen Vance",
    "rating": "4/5",
    "genre": [
      "Software Engineering",
      "TDD",
      "Best Practices"
    ],
    "link": "https://www.amazon.co.uk/gp/product/B00GO4I9B8/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=B00GO4I9B8&linkCode=as2&tag=jussihallilac-21",
    "review": "A good book about test-drive development. It goes through techniques in detail how to improve the quality of your code base with testing. For me this title came at a good time since I was just making a bigger shift towards embracing more TDD. The book laid out a good groundwork on the type of coding around that area. Sometimes the content is a little bit too basic but all in all the book is a good read if the timing is correct. You need to know your testing a little, but not too much for this to hit home."
  },
  {
    "slug": "refactoring-to-patterns",
    "title": "Refactoring to Patterns",
    "author": "Joshua Kerievsky",
    "rating": "2/5",
    "genre": [
      "Software Engineering",
      "Design Patterns",
      "Refactoring"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0321213351/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0321213351&linkCode=as2&tag=jussihallilac-21",
    "review": "A glue book between Gang of Four's design patterns and Marting Fowler's Refactoring. The book is a catalogued collection of code smells and steps how to get to the needed design patternized solution out of that smell. Unfortunately much of the book is geared towards legacy code and at times somewhat outdated. Also much of the solutions tend to be fairly simple and straightforward. It is a good complement to Refactoring but in itself I don't think it will give much insights to competent Java developers."
  },
  {
    "slug": "refactoring",
    "title": "Refactoring",
    "author": "Martin Fowler",
    "rating": "4/5",
    "genre": [
      "Software Engineering",
      "Refactoring"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0201485672/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0201485672&linkCode=as2&tag=jussihallilac-21",
    "review": "A classic. This is an excellent book to first skim through to get a superficial knowledge about the topic and then return to every time you see something that \"doesn't feel right\" in your code base. The book is a catalogue of code smells and solutions to how to get rid of them. Very beneficial to all Java programmers and mostly a must read to everyone who is working on legacy code (so everyone). Some of the pages are somewhat outdated due to modern IDEs giving you the one-click option to highlight a code smell and refactor to a better solution."
  },
  {
    "slug": "remote-jobseekers-handbook",
    "title": "Remote Jobseekers Handbook",
    "author": "Coby Chapple",
    "rating": "2/5",
    "genre": [
      "Career",
      "Remote Work"
    ],
    "link": "",
    "review": "Nice small book about resources and techniques on how to find and survive remote work. Chapters around remote work itself and what kind of expectations one should impose on it are very interesting and contain a lot of useful information. I would have liked those to be a little bit longer and contain more insightful tips and experiences on that. The content regarding online resources etc. is useful but might work better in an online form. In the end the book is a good introduction to remote work and lines out things one should expect about it."
  },
  {
    "slug": "scrum-and-xp-from-the-trenches",
    "title": "Scrum and XP From The Trenches",
    "author": "Henrik Kniberg",
    "rating": "4/5",
    "genre": [
      "Software Methodology",
      "Scrum",
      "XP"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1329224272/ref=as_li_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1329224272&linkCode=as2&tag=jussihallilac-21",
    "review": "A short recap about scrum and how Henrik Kniberg's team has adopted that. These kind of books are always good to read because they give you a more hands-on understanding about the topic at hand. This book is no different and it lines out valuable insights on Scrum and some challenges that you might be expecting when adopting it. As a short read this is a very recommendable title."
  },
  {
    "slug": "service-design-patterns",
    "title": "Service Design Patterns",
    "author": "Robert Daigneau",
    "rating": "2/5",
    "genre": [
      "Web Services",
      "Patterns"
    ],
    "link": "https://www.amazon.co.uk/gp/product/032154420X/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=032154420X&linkCode=as2&tag=jussihallilac-21",
    "review": "While buying this book I was balancing my decision between this and Enterprise Integration Patterns. In hindsight that would have probably been a better purchase for the that time period. This book goes through deisgn patterns around \"heavier\" style services in service oriented architecture. Works well as a reference book to skim through and see if a particular solution would fit the current use case. Now when focus is shifting towards microservices I will be opening the book every now and then to look for similarities and inspiration but all in all I believe there are better resources around the topic than this."
  },
  {
    "slug": "servlets-and-java-server-pages",
    "title": "Servlets and Java Server Pages",
    "author": "Marty Hall / Larry Brown",
    "rating": "1/5",
    "genre": [
      "Java",
      "Core Web"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0130092290/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0130092290&linkCode=as2&tag=jussihallilac-21",
    "review": "Probably a good book for it's time. For me this didn't really hit home since my development stack is not near J2EE and core servlets. Touches few interesting bits around JSP if that is something you want to use in your application to handle server side rendering but other than that, most of the content is outdated due to lighter weight Java Web development frameworks/"
  },
  {
    "slug": "soft-skills-software-developers-life-manual",
    "title": "Soft Skills: The Software Developer's Life Manual",
    "author": "John Sonmez",
    "rating": "5/5",
    "genre": [
      "Career",
      "Professionalism"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1617292397/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1617292397&linkCode=as2&tag=jussihallilac-21",
    "review": "After Clean Coder and Passionate Programmer there was a long time without a proper book about software development as a career and how to make most ot of your passion around your profession. Soft Skills is irght up there with those classics and might be even better. The book goes through all the needed skills a software developer needs to create a good career, inside and outside of the office. The book lines up everything from mental and physical health to money management and salesmanship as means to make the best thing possible out of your career. John Sonmez has crafted an excellent tutorial to everyone, not just software developers, how to, essentially, live your life. Excellent book."
  },
  {
    "slug": "starting-an-online-business",
    "title": "Starting an Online Business",
    "author": "Greg Holden",
    "rating": "1/5",
    "genre": [
      "Business",
      "Entrepeneurism"
    ],
    "link": "https://www.amazon.co.uk/gp/product/1119991382/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=1119991382&linkCode=as2&tag=jussihallilac-21",
    "review": "A for dummies series book that goes through the basics of an online business. Might be a good one for people coming to the topic with no earlier experience. For me the book was too much 'for dummies' and I did not get too much out of it."
  },
  {
    "slug": "succeeding-with-agile",
    "title": "Succeeding with Agile",
    "author": "Mike Cohn",
    "rating": "5/5",
    "genre": [
      "Agile Methodology",
      "Scrum"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0321579364/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0321579364&linkCode=as2&tag=jussihallilac-21",
    "review": "One book about Scrum I really enjoyed. Even though I think Scrum has seen it's glory days and will decline in the future to yet another management fad I found good information about it from this book. Mike Cohn is one of the founding fathers of Scrum and knows what he is talking about. If you want to direct your career towards scrum mastery and management side, this title is a really good starting point. It lays out everything you need to know about Scrum, starting from basics and expanding all the way to distributed and massive teams."
  },
  {
    "slug": "test-driven-javascript-development",
    "title": "Test Driven Javascript Development",
    "author": "Christian Johansen",
    "rating": "3/5",
    "genre": [
      "Javascript",
      "TDD"
    ],
    "link": "https://www.amazon.co.uk/gp/product/0321683919/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&camp=1634&creative=6738&creativeASIN=0321683919&linkCode=as2&tag=jussihallilac-21",
    "review": "A good introduction to test driven development with Javascript. Goes through the TDD process in JS and more importantly touches quite a bit of important aspects of the language itself. Unfortunately since Javascript is moving so fast the testing tools/libraries in this book are a bit out of date for current JS scene. Even with that it is a good read if you want to get a bit deeper insight on testing with Javascript."
  }
]
