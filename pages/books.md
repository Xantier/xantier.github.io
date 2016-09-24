---
layout: default
title: Book Reviews
permalink: /books/
---
<div class="well">
    <div class="list-group">
      {% for book in site.books %}
      <div class="list-group-item">
        <div class="row-action-primary">
          <i class="fa fa-gavel"></i>
        </div>
        <div class="row-content">
          <div class="least-content">Rating: {{ book.rating }}</div>
          <h4 class="list-group-item-heading"><a href="{{ book.url | prepend: site.baseurl }}">{{ book.title }}</a></h4>

          <p class="list-group-item-text">{{ book.content | strip_html | truncatewords: 20 }}</p>
        </div>
      </div>
      <div class="list-group-separator"></div>
      {% endfor %}
    </div>
</div><!-- end #home -->
