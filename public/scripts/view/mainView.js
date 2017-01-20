'use strict';

(function(module){
  const mainView = {};
  //
  // mainView.populateFilters = function() {
  //   Articles.all.forEach(function(a) {
  //     $('#projects').append(a.toHtml('#atemplate'));
  //     $('#project-filter').append(a.toHtml('#project-filter-template'));
  //     if($('#category-filter option:contains("' + a.category + '")').length === 0) {
  //       $('#category-filter').append(a.toHtml('#category-filter-template'));
  //     }
  //   });
  //
  //
  //   $('article').each(function() {
  //     if (!$(this).hasClass('template')) {
  //       var val = $(this).find('h4 a').text();
  //       var optionTag = `<option value="${val}">${val}</option>`;
  //       if ($(`#title-filter option[value="${val}"]`).length === 0){
  //         $('#title-filter').append(optionTag);
  //
  //         val = $(this).attr('data-category');
  //         optionTag = `<option value="${val}">${val}</option>`;
  //         if ($(`#category-filter option[value="${val}"]`).length === 0){
  //           $('#category-filter').append(optionTag);
  //         }
  //       }
  //     }
  //   });
  // };
  //
  // mainView.handleTitleFilter = function(){
  //   $('#title-filter').on('change', function() {
  //     if ($(this).val()) {
  //       $('article').hide();
  //       $(`article[data-title="${$(this).val()}"]`).fadeIn();
  //     } else {
  //       $('article').fadeIn();
  //       $('article.template').hide();
  //     }
  //     $('#category-filter').val('');
  //   });
  // };
  //
  // mainView.handleCategoryFilter = function(){
  //   $('#category-filter').on('change', function() {
  //     if ($(this).val()){
  //       $('article').hide();
  //       $(`article[data-category="${$(this).val()}"]`).fadeIn();
  //     } else {
  //       $('article').fadeIn();
  //       $('article.template').hide();
  //     }
  //     $('#title-filter').val('');
  //   });
  // }

  mainView.populateBlogFilters = function() {
    $('article').each(function() {
      if (!$(this).hasClass('template')) {
        var val = $(this).find('h5').text();
        var optionTag = `<option value="${val}">${val}</option>`;
        if ($(`#blogTitle-filter option[value="${val}"]`).length === 0) {
          $('#blogTitle-filter').append(optionTag);

          val = $(this).attr('data-blogcategory');
          optionTag = `<option value="${val}">${val}</option>`;
          if ($(`#blogCategory-filter option[value="${val}"]`).length === 0) {
            $('#blogCategory-filter').append(optionTag);
          }
        }
      }
    });
  };

  mainView.handleBlogTitleFilter = function(){
    $('#blogTitle-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $(`article[data-title="${$(this).val()}"]`).fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#blogCategory-filter').val('');
    });
  };

  mainView.handleBlogCategoryFilter = function(){
    $('#blogCategory-filter').on('change', function() {
      if ($(this).val()){
        $('article').hide();
        $(`article[data-blogcategory="${$(this).val()}"]`).fadeIn();
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#blogTitle-filter').val('');
    });
  }
  mainView.handleMainNav = function () {
    $('.tabContent, articles').hide();
    $('#aboutMe').show();

    $('.main-nav').on('click', '.tab',function(e){
      e.preventDefault();
      var $see = $(this).attr('data-content');
      console.log($see);
      $('.tabContent, article').hide();
      $('#' + $see).show();

    })


    $('.theSkills ul > li').hide();
    $('.theSkills').show();
    $('.theSkills').on('click', 'ul', function(e) {
      var target = $(this);
      e.preventDefault();
      $('.theSkills ul > li').each(function() {
        if ($(this).is(':visible') && $(this).parent().text() !== target.text()) {
          $(this).toggle(200);
        }
      });
      target.find('li').toggle(300);
    });
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

    $('#articles').append(formArticle.toHtml('#atemplate'));
    $('pre code').each((i, block) => hljs.highlightBlock(block));
    $('#export-field').show();
    $('#article-json').val(`${JSON.stringify(formArticle)},`);
  };

  // mainView.initNewBlogArticlePage = function() {
  // // DONE: Ensure the main .tab-content area is revealed. We might add more tabs later.
  //   $('.tab-content').show();
  //   $('#export-field').hide();
  //   $('#article-json').on('focus', function(){
  //     $(this).select();
  //   });
  //   $('#new-form').on('change', 'input, textarea', mainView.create);
  // };
  //
  //
  // mainView.create = function() {
  //   var formArticle;
  //   $('#articles').empty().show();
  //
  //   formArticle = new Articles({
  //     title: $('#article-title').val(),
  //     body: $('#article-body').val(),
  //     projectUrl: $('#article-project-url').val(),
  //     category: $('#article-category').val(),
  //     publishedOn: $('#article-published:checked').length ? new Date() : null
  //   });
  //   $('#articles').append(formArticle.toHtml('#btemplate'));
  //   console.log(formArticle);
  //
  //   $('pre code').each(function(i, block) {
  //     hljs.highlightBlock(block);
  //   });
  // // DONE: Export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
  //   $('#export-field').show();
  //   $('#article-json').val(JSON.stringify(formArticle) + ',');
  // };
  //


  mainView.initIndexPage = () => {
    $('#ajax-spinner').fadeOut();
    $('#filters').fadeIn();
    Articles.all.forEach(article => {
      $('#blog').append(article.toHtml('#btemplate'));
      if($(`#category-filter option:contains("${article.category}")`).length === 0) {
        $('#category-filter').append(article.toHtml('#category-filter-template'));
      }
      if($(`#author-filter option:contains("${article.author}")`).length === 0) {
        $('#author-filter').append(article.toHtml('#author-filter-template'));
      }
    });



    mainView.populateBlogFilters();
    mainView.handleBlogTitleFilter();
    mainView.handleBlogCategoryFilter();
    mainView.handleMainNav();
  };

  Articles.fetchAll(mainView.initIndexPage);
  module.mainView = mainView;
})(window);
