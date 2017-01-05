'use strict';

$(document).ready(function(){
  $('.tabContent').hide();
  $('#aboutMe').show();
});

$('.main-nav').on('click', '.tab',function(e){
  e.preventDefault();
  var $see = $(this).attr('data-content');
  console.log($see);
  $('.tabContent').hide();
  $('#' + $see).show();
})

$('.theSkills ul > li').hide();
$('.theSkills').show();
$('.theSkills').on('click', 'ul', function(e) {
  var target = $(this);
  e.preventDefault();
  $('.theSkills ul > li').each(function() {
    if ($(this).is(':visible') && $(this).parent().text() !== target.text()) {
      $(this).toggle(200);
    }
  });
  target.find('li').toggle(300);
});
