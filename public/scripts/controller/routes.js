'use strict';

page('/projects', projectController.index);
page('/blogs', articleController.index);
page('/skills', skillsController.index);
page('/contact', contactController.index);

page();
