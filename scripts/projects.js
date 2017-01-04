// 'use strict';

var projects = [];

function Project (options) {

  this.title = options.title;
  this.category = options.category;
  this.projectUrl = options.projectsUrl;
  this.publishedOn = options.publishedOn;
  this.body = options.body;
}

Project.prototype.toHtml = function() {
  var $newProject = $('project.template').clone();
  $newProject.attr('category', this.category);
  $newProject.find('h1 a').html(this.title).attr('href', this.projectUrl);
  $newProject.find('.project-body').html(this.body);
  $newProject.attr('publishedOn', this.publishedOn);
  $newProject.find('time[pubdate]').attr('title', this.publishedOn);
  $newProject.find('time').text('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newProject.removeClass('template');
  return $newProject;
};

projectData.sort(function(currentObject, nextObject) {
  return (new Date(nextObject.publishedOn)) - (new Date(currentObject.publishedOn));
});

projectData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(project) {
  $('#projects').append(project.toHtml());
});
