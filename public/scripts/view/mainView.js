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
        if ($(`#title-filter option[value="${val}"]`).length === 0) {
          $('#title-filter').append(optionTag);

          val = $(this).attr('data-blogcategory');
          optionTag = `<option value="${val}">${val}</option>`;
          if ($(`#blogCategory-filter option[value="${val}"]`).length === 0) {
            $('#blogCategory-filter').append(optionTag);
          }
        }
      }
    });
  };

  mainView.handleAuthorFilter = function(){
    $('#title-filter').on('change', function() {
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
      $('#title-filter').val('');
    });
  }



  mainView.initIndexPage = () => {
    $('#filters').fadeIn();
    Articles.all.forEach(article => {
      $('#blog').append(article.toHtml('#btemplate'));
      if($(`#blogCategory-filter option:contains("${article.category}")`).length === 0) {
        $('#blogCategory-filter').append(article.toHtml('#blogCategory-filter-template'));
      }
      if($(`#title-filter option:contains("${article.author}")`).length === 0) {
        $('#title-filter').append(article.toHtml('#title-filter-template'));
      }
    });



    mainView.populateBlogFilters();
    mainView.handleTitleFilter();
    mainView.handleBlogCategoryFilter();

  };

  Articles.fetchAll(mainView.initIndexPage);
  module.mainView = mainView;
})(window);
