'use strict';

var allArticles = [];

function Article (options) {

  this.title = options.title;
  this.category = options.category;
  this.projectUrl = options.projectUrl;
  this.publishedOn = options.publishedOn;
  this.body = options.body;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  $newArticle.attr('data-category', this.category);
  $newArticle.attr('data-title', this.title);
  $newArticle.find('h4 a')
            .html(this.title)
            .attr('href', this.projectUrl);
  $newArticle.find('.project-body').html(this.body);
  $newArticle.attr('publishedOn', this.publishedOn);
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').html('published' + ' ' + 'exactly ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newArticle.removeClass('template');
  return $newArticle;
};

projectData.sort(function(currentObject, nextObject) {
  return (new Date(nextObject.publishedOn)) - (new Date(currentObject.publishedOn));
});

projectData.forEach(function(ele) {
  allArticles.push(new Article(ele));
});

allArticles.forEach(function(article) {
  $('#projects').append(article.toHtml());
});
