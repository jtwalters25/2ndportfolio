(function() {
  const mainView = {};

  mainView.initNewBlogArticlePage = function() {

    $('.tab-content').show();
    $('#export-field').hide();
    $('#article-json').on('focus', function(){
      $(this).select();
    });
    $('#new-form').on('change', 'input, textarea', mainView.create);
  };


  mainView.create = function() {
    var formArticle;
    $('#articles').empty().show();

    formArticle = new Articles({
      title: $('#article-title').val(),
      body: $('#article-body').val(),
      projectUrl: $('#article-project-url').val(),
      category: $('#article-category').val(),
      publishedOn: $('#article-published:checked').length ? new Date() : null
    });
    $('#articles').append(formArticle.toHtml('#btemplate'));
    $('pre code').each((i, block) => hljs.highlightBlock(block));
    $('#export-field').show();
    $('#article-json').val(JSON.stringify(formArticle) + ',');
  };

  mainView.initNewBlogArticlePage();
})();
