'use strict';

(function(module) {
  const articleController = {};
  articleController.index = () => {
    Articles.fetchAll(mainView.initIndexPage);

    $('main > section').hide();
    $('#articles').show();
  };

  module.articleController = articleController;
})(window);
