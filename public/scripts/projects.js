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


    Articles.all = projectData.map(ele => {
      return new Articles(ele);
    });

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

  Articles.allTitle = function() {
    return Articles.all.map(function(titles) {
      return article.title;
    })
    .reduce(function(names, name) {
      if (names.indexOf(name) === -1) {
        names.push(name);
      }
      return names;
    }, []);
  };

  Articles.numWordsAll = function() {
    return Articles.all.map(function(articles) {
      return articles.body.match(/\b\w+/g).length;
    })
    .reduce(function(a, b) {
      return a + b;
    });
  };

  Articles.numWordsByTitle = function() {
    return Articles.allTitles().map(function(title) {
      return {
        name: title,
        numWords: Articles.all.filter(function(a) {
          return a.title === title;
        })
        .map(function(a) {
          return a.body.match(/\b\w+/g).length
        })
        .reduce(function(a, b) {
          return a + b;
        })
      }
    })
  };

  Articles.stats = function() {
    return {
      numArticles: Articles.all.length,
      numWords: Articles.numwords(),
      titles: Articles.alltitles(),
    };
  }

  module.Articles = Articles;
})(window);
//close scope here
