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
          <h4 class="list-group-item-heading">{{ book.title }} - {{ book.author }}</h4>
          <p class="list-group-item-text">
          <div class="least-content">Genre: {{ book.genre | array_to_sentence_string }}</div>
          {{ book.content }}
          </p>
        </div>
      </div>
      <div class="list-group-separator"></div>
      {% endfor %}
    </div>
</div><!-- end #home -->
