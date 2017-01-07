'use strict';

var allBlogs = [];

function Blogarticle (options) {
  for ( var key in options) {
    this[key] = options[key];
  }
}
  // this.title = options.title;
  // this.blogcategory = options.blogcategory;
  // this.publishedOn = options.publishedOn;
  // this.body = options.body;


Blogarticle.prototype.toHtml = function() {
  var brender = $('#btemplate').html();
  var rendertemplate = Handlebars.compile(brender);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishedStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

  return rendertemplate(this);
};
  // var $newArticle = $('article.template').clone();
  // $newArticle.attr('data-blogcategory', this.blogcategory);
  // $newArticle.attr('data-title', this.title);
  // $newArticle.find('h5').html(this.title);
  // $newArticle.find('.blog-body').html(this.body);
  // $newArticle.attr('publishedOn', this.publishedOn);
  // $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  // $newArticle.find('time').text('published' + ' ' + 'exactly ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  //
  // $newArticle.removeClass('template');
  // return $newArticle;

blogArticles.sort(function(c,d) {
  return (new Date(d.publishedOn)) - (new Date(c.publishedOn));
});

blogArticles.forEach(function(ele) {
  allBlogs.push(new Blogarticle(ele));
});

allBlogs.forEach(function(articl) {
  $('#blog').append(articl.toHtml());
});
