'use strict';

$(document).ready(function(){
  $('.tabContent').hide();
  $('#aboutMe').show();
});
$('.main-nav ul a').on('click', function(){
  var $peek = $(this).data('tab');
  $('.tabContent').fadeIn();
  $('#' + $peek).fadeIn();
});

// $(function(){
//   $('.moreText').hide();
//   $('a.readMore').click(function(event){
//     event.preventDefault();
//     $(this).parents('.tabContent').find('.moreText').show();
//     $(this).parents('.tabContent').find('a').hide();
//
//   });
