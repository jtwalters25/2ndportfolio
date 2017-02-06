'use strict';

(function(module) {
  const homeController = {};
  homeController.index = () => {
    $('#aboutMe').show().siblings().hide();
  }
  module.homeController = homeController;
})(window);
