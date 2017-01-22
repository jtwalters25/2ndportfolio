'use strict';

(function(module) {
  const repoView = {};

  const ui = function() {
    let $projects = $('#projects');
    $projects.find('ul').empty();
    $projects.show().siblings().hide();
  };

  const render = Handlebars.compile($('#repo-template').text());

  repoView.index = function() {
    ui();
  }



  module.repoView = repoView;
})(window);
