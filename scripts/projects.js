'use strict';

var allArticles = [];

function Article (opts) {
  for ( var key in opts) {
    this[key] = opts[key];
  }
}
Article.prototype.toHtml = function() {
  var render   = $('#atemplate').html();
  var templaterender = Handlebars.compile(render);


  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishedStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

  return templaterender(this);
};

projectData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projectData.forEach(function(ele) {
  allArticles.push(new Article(ele));
});

allArticles.forEach(function(article) {
  $('#projects').append(article.toHtml());
});
