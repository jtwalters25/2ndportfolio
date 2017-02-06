'use strict';
//invoking page with two arguments, route and a route handler. registering route Handlebars
page('/', homeController.index);
page('/contact', contactController.index);
page('/projects', projectController.index);
page('/blog', articleController.index);
page('/skills', skillsController.index);

//calling page function with no argument establing control over page.js and executes core functionality
page();
