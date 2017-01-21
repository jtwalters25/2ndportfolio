'use strict';

(function(module) {
  const articleController = {};
  articleController.index = () => {
    Articles.fetchAll(mainView.initIndexPage);

    $('.tabContent, articles').hide();
    $('#aboutMe').show();
  };

  module.articleController = articleController;
})(window);
