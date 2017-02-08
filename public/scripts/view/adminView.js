(function() {
  const adminView = {
    initAdminPage : () => {
      let template = Handlebars.compile($('#admin-template').text());
      Articles.numWordsByAuthor().forEach(stat => $('.author-stats').append(template(stat)));
      $('#blog-stats .articles').text(Articles.all.length);
      $('#blog-stats .words').text(Articles.numWordsAll());
    }
  };

  Articles.fetchAll(adminView.initAdminPage);
})();
