'use strict';

var mainView = {};

mainView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var theTitle, optionTag, category;
    theTitle = $(this).find('h4 a').text();
    optionTag = '<option value="' + theTitle + '">' + theTitle + '</option>';
    $('#title-filter').append(optionTag);
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
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
mainView.handleTitleFilter();
mainView.handleCategoryFilter();
mainView.handleMainNav();
