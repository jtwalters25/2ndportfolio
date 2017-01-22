'use strict';

(function(module) {
  const articleController = {};
  articleController.index = () => {
    Articles.fetchAll(mainView.initIndexPage);
    $('.main-nav').on('click', '.tab',function(e){
      e.preventDefault();
      var $see = $(this).attr('data-content');
      console.log($see);
      $('.tabContent, article').hide();
      $('#' + $see).show();
    })
  }
  module.articleController = articleController;
})(window);
