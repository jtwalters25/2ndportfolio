
'use strict';

(function(module) {
  const articleController = {};
  articleController.index = () => {
    $('#blog').show().siblings().hide();
  }
  module.articleController = articleController;
})(window);
