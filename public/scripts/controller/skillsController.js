'use strict';

(function(module) {
  const skillsController = {};
  skillsController.index = () => {
    $('.theSkills ul > li').hide();
    $('.theSkills').show();
    $('.theSkills').on('click', 'ul', function(e) {
      var target = $(this);
      e.preventDefault();
      $('.theSkills ul > li').each(function() {
        if ($(this).is(':visible') && $(this).parent().text() !== target.text()) {
          $(this).toggle(200);
        }
      })
      target.find('li').toggle(300);
    });
  }
  module.skillsController = skillsController;
})(window);
