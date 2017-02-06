(function() {
  const adminView = {
    initAdminPage : () => {
      let template = Handlebars.compile($('#author-template').text());
      Articles.numWordsByAuthor().forEach(stat => $('.author-stats').append(template(stat)));
      $('#blog-stats .articles').text(Articles.all.length);
      $('#blog-stats .words').text(Articles.numWordsAll());
    }
  };

  Articles.fetchAll(adminView.initAdminPage);
})();
