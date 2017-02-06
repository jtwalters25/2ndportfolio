'use strict';

(function(module) {
  const contactController = {};
  contactController.index = () => {
    $('#contact').show().siblings().hide();
  }
  module.contactController = contactController;
})(window);
