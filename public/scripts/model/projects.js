'use strict';
//Scope added here and adding arrow syntax
(function(module) {
  function Articles (opts) {
    Object.keys(opts).forEach(e => this[e] = opts[e]);
  }

  Articles.all = [];

  Articles.prototype.toHtml = function() {
    var templaterender = Handlebars.compile($('#atemplate').text());


    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishedStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
    this.body = marked(this.body);

    return templaterender(this);
  };

  Articles.loadAll = projectData => {
    projectData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)));
    Articles.all = projectData.map(ele => new Articles(ele));
  };


  Articles.fetchAll = function() {
    if (localStorage.articles) {
      Articles.loadAll(JSON.parse(localStorage.articles));
      mainView.populateFilters();
    } else {
      $.getJSON('../data/projects.json')
     .done(data => {
       localStorage.articles = JSON.stringify(data);
       Articles.loadAll(data);
       mainView.populateFilters();
     })
    }
  };
    //DONE: What do we pass in to loadAll()? An array!
    //DONE: What method do we call to render the index page?
    // DONE: When we don't already have the rawData,
    // we need to retrieve the JSON file from the server with AJAX (which jQuery method is best for this?),
    // cache it in localStorage so we can skip the server call next time,
    // then load all the data into Article.all with the .loadAll function above,
    // and then render the index page.


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
//close scope here
