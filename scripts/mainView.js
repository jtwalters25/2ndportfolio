'use strict';

(function(module) {

  var articleView = {};

  articleView.handleWhatShows = function(){
    $('.tabContent').hide();
    $('#home').show();
  };
  $('.main-nav ul a').on('click', function(){
    var $peek = $(this).data('tab');
    $('.sectionContent, .tabContent').fadeOut();
    $('#' + $peek).fadeIn();
  });

  articleView.readMore = function(){
    $('.moreText').hide();
    $('a.readMore').on('click', function(event){
      event.preventDefault();
      $(this).parents('.tabContent').find('.moreText').show();
      $(this).parents('.tabContent').find('.readMore').hide();
    });
  };

  articleView.toggleNavDisplay = function() {
    $('.icon-menu').on('click', function() {
      $('.main-nav ul').toggle();
    });
  };

  articleView.initSkills = function() {
    $('.theSkills ul > li').hide();
    $('.theSkills').show();
  };
  $('.theSkills').on('click', 'ul', function(e) {
    var target = $(this);
    e.preventDefault();
    $('.theSkills ul > li').each(function() {
      if ($(this).is(':visible') && $(this).parent().text() != target.text()) {
        $(this).toggle(200);
      }
    });
    target.find('li').toggle(300);
  });


  articleView.handleWhatShows();
  articleView.toggleNavDisplay();
  articleView.initSkills();
  articleView.readMore();

  module.articleView = articleView;
})(window);
