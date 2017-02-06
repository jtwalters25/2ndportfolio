'use strict';
(function(module) {
  function Articles (opts) {
    Object.keys(opts).forEach(e => this[e] = opts[e]);
  }

  Articles.all = [];

  Articles.prototype.toHtml = function() {
    var rendertemplate = Handlebars.compile($('#btemplate').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishedStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

    this.body = marked(this.body);
    return rendertemplate(this);
  };

  Articles.loadAll = rows => {
    rows.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)));
    Articles.all = rows.map(ele => new Articles(ele));
  };

  Articles.fetchAll = callback => {
    $.get('/articles/all')
    .then(
      results => {
        if (results.rows.length) {
          Articles.loadAll(results.rows);
          callback();
        } else {
          $.getJSON('../data/blogArticles.json')
          .then(rawData => {
            rawData.forEach(item => {
              let article = new Articles(item);
              article.insertRecord();
            })
          })
          .then(() => Articles.fetchAll(callback))
          .catch(console.error);
        }
      }
    )
  };

  Articles.allAuthors = () => {
    return Articles.all.map(articles => articles.author)
                  .reduce((names, name) => {
                    if (names.indexOf(name) === -1) names.push(name);
                    return names;
                  }, []);
  };


  Articles.numWordsAll = () => {
    return Articles.all.map(articles => articles.body.match(/\b\w+/g).length)
                   .reduce((a, b) => a + b)
  };

  Articles.numWordsByAuthor = () => {
    return Articles.allAuthors().map(author => {
      return {
        name: author,
        numWords: Articles.all.filter(a => a.author === author)
      .map(a =>
        a.body.match(/\b\w+/g).length)
      .reduce((a, b) => a + b)
      }
    })
  };

  Articles.stats = () => {
    return {
      numArticles: Articles.all.length,
      numWords: Articles.numwords(),
      Authors: Articles.allAuthors(),
    }
  };

  Articles.truncateTable = callback => {
    $.ajax({
      url: '/articles/truncate',
      method: 'DELETE',
    })
  .then(console.log)
  .then(callback);
  };

  Articles.prototype.insertRecord = function(callback) {
    $.post('/articles/insert', {author: this.author, authorUrl: this.authorUrl, body: this.body, category: this.category, publishedOn: this.publishedOn, title: this.title})
  .then(console.log)
  .then(callback);
  };

  Articles.prototype.deleteRecord = function(callback) {
    $.ajax({
      url: '/articles/delete',
      method: 'DELETE',
      data: {id: this.article_id}
    })
  .then(console.log)
  .then(callback);
  };

  Articles.prototype.updateRecord = function(callback) {
    $.ajax({
      url: '/articles/delete',
      method: 'DELETE',
      data: {
        author: this.author,
        authorUrl: this.authorUrl,
        body: this.body,
        category: this.category,
        publishedOn: this.publishedOn,
        title: this.title,
        id: this.article_id}
    })
  .then(console.log)
  .then(callback);
  };

  module.Articles = Articles;
})(window);
