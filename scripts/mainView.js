'use strict';

var mainView = {};

mainView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('h4 a').text();
      var optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#title-filter option[value="${val}"]`).length === 0){
        $('#title-filter').append(optionTag);

        val = $(this).attr('data-category');
        optionTag = `<option value="${val}">${val}</option>`;
        if ($(`#category-filter option[value="${val}"]`).length === 0){
          $('#category-filter').append(optionTag);
        }
      }
    }
  });
};

mainView.handleTitleFilter = function(){
  $('#title-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-title="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

mainView.handleCategoryFilter = function(){
  $('#category-filter').on('change', function() {
    if ($(this).val()){
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#title-filter').val('');
  });
}

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
  $('.tabContent, article').hide();
  $('#aboutMe').show();

  $('.main-nav').on('click', '.tab',function(e){
    e.preventDefault();
    var $see = $(this).attr('data-content');
    console.log($see);
    $('.tabContent').hide();
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

mainView.initNewArticlePage = function() {
  // DONE: Ensure the main .tab-content area is revealed. We might add more tabs later.
  $('.tab-content').show();
  $('#export-field').hide();
  $('#article-json').on('focus', function(){
    $(this).select();
  });
  $('document').on('change', mainView.create);
};

mainView.create = function() {
  var formArticle;
  $('#articles').empty().show();

  formArticle = new Article({
    title: $('#article-title').val(),
    body: $('#article-body').val(),
    projectUrl: $('#article-project-url').val(),
    category: $('#article-category').val(),
    publishedOn: $('#article-published:checked').length ? new Date() : null
  });
  $('#articles').append(formArticle.toHtml('#article-template'));

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  // DONE: Export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
  $('#export-field').show();
  $('#article-json').val(JSON.stringify(formArticle) + ',');
  console.log('Worked');
};


mainView.initIndexPage = function () {

  mainView.populateFilters();
  mainView.populateBlogFilters();
  mainView.handleTitleFilter();
  mainView.handleCategoryFilter();
  mainView.handleBlogTitleFilter();
  mainView.handleBlogCategoryFilter();
  mainView.handleMainNav();
};
