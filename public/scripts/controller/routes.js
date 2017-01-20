'use strict';
//invoking page with two arguments, route and a route handler. registering route Handlebars
page('/projects', projectController.index);
page('/blog', articleController.index);
//calling page function with no argument establing control over page.js and executes core functionality
page();
