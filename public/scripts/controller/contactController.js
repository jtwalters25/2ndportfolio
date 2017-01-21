'use strict';

(function(module) {
  const contactController = {};
  contactController.index = () => {
    $('.main-nav').on('click', '.tab',function(e){
      e.preventDefault();
      var $see = $(this).attr('data-content');
      console.log($see);
      $('.tabContent, article').hide();
      $('#' + $see).show();
    })
  }
  module.contactController = contactController;
})(window);
