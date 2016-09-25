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
          <h3 class="list-group-item-heading">{{ book.title }} - {{ book.author }}</h3>
          <p class="list-group-item-text">
          <div style="position: relative; color: rgba(0,0,0,.54); font-size: 14px;">{{ book.genre | array_to_sentence_string }}</div>
          {{ book.content }}
          </p>
        </div>
      </div>
      <div class="list-group-separator"></div>
      {% endfor %}
    </div>
</div><!-- end #home -->
