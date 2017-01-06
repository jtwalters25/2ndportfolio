'use strict';

var mainView = {};

mainView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var theTitle, optionTag, category;
    theTitle = $(this).find('h4 a').text();
    optionTag = '<option value="' + theTitle + '">' + theTitle + '</option>';
    if ($('#title-filter option[value="' + theTitle + '"]').length === 0) {
      $('#title-filter').append(optionTag);
    }
    else {
      $('.template').hide();
    }
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
    else {
      $('.template').hide();
    }
  });
};

mainView.handleTitleFilter = function(){
  $('#title-filter').on('change', function() {
    if ($(this).val()){
      var $theTitle = $(this).val();
      $('article').hide();
      $('article[data-title="' + $theTitle + '"]').fadeIn();
    } else {
      $('.template').hide();
    }
    $('#category-filter').val('');
  });
}

mainView.handleCategoryFilter = function(){
  $('#category-filter').on('change', function() {
    if ($(this).val()){
      var $category = $(this).val();
      $('article').hide();
      $('article[data-category="' + $category + '"]').fadeIn();
    } else {
      $('.template').hide();
    }
    $('#title-filter').val('');
  });
}

mainView.populateBlogFilters = function() {
  $('article').not('.template').each(function() {
    var theTitle, optionTag, blogcategory;
    theTitle = $(this).find('h5').text();
    optionTag = '<option value="' + theTitle + '">' + theTitle + '</option>';
    if ($('#blogTitle-filter option[value="' + theTitle + '"]').length === 0) {
      $('#blogTitle-filter').append(optionTag);
    }
    blogcategory = $(this).attr('data-blogcategory');
    optionTag = '<option value="' + blogcategory + '">' + blogcategory + '</option>';
    if ($('#blogCategory-filter option[value="' + blogcategory + '"]').length === 0) {
      $('#blogCategory-filter').append(optionTag);
    }
    else {
      $('.template').hide();
    }
  });
};

mainView.handleBlogTitleFilter = function(){
  $('#blogTitle-filter').on('change', function() {
    if ($(this).val()){
      var $blogTitle = $(this).val();
      $('article').hide();
      $('article[data-title="' + $blogTitle + '"]').fadeIn();
    } else {
      $('.template').hide();
    }
    $('#blogCategory-filter').val('');
  });
}
mainView.handleBlogCategoryFilter = function(){
  $('#blogCategory-filter').on('change', function() {
    if ($(this).val()){
      var $blogCategory = $(this).val();
      $('article').hide();
      $('article[data-category="' + $blogCategory + '"]').fadeIn();
    } else {
      $('.template').hide();
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

mainView.populateFilters();
mainView.populateBlogFilters();
mainView.handleTitleFilter();
mainView.handleCategoryFilter();
mainView.handleBlogTitleFilter();
mainView.handleBlogCategoryFilter();
mainView.handleMainNav();
