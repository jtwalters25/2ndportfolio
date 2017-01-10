'use strict';



// function Articles (opts) {
//   for ( var key in opts) {
//     this[key] = opts[key];
//   }
// }
function Articles (opts) {
  this.projectUrl = opts.projectUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Articles.all = [];

Articles.prototype.toHtml = function() {
  var render   = $('#atemplate').html();
  var templaterender = Handlebars.compile(render);


  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishedStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return templaterender(this);
};

Articles.loadAll = function(projectData) {

  projectData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  projectData.forEach(function(ele) {
    Articles.all.push(new Articles(ele));
  });
};
Articles.fetchAll = function() {
  if (localStorage.articles) {

    Articles.loadAll(JSON.parse(localStorage.articles));
      // mainView.initIndexPage();
    mainView.populateFilters();
     //DONE: What do we pass in to loadAll()? An array!
    //DONE: What method do we call to render the index page?
  } else {
    // DONE: When we don't already have the rawData,
    // we need to retrieve the JSON file from the server with AJAX (which jQuery method is best for this?),
    // cache it in localStorage so we can skip the server call next time,
    // then load all the data into Article.all with the .loadAll function above,
    // and then render the index page.

    $.getJSON('../data/projects.json')
     .done(function(data) {
       localStorage.articles = JSON.stringify(data);
       Articles.loadAll(data);
       mainView.populateFilters();
     })
  }
};
