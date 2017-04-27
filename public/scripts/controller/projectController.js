'use strict';

(function(module) {
  const projectController = {};

  projectController.index = () => {
    $('#projects').show().siblings().hide();
    repos.requestRepos(repoView.index);
  };

  module.projectController = projectController;
})(window);
