'use strict';

(function(module) {
  const repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    // TODid: How would you like to fetch your repos? Don't forget to call the callback.
    $.ajax({
      url:'https://api.github.com/user/repos?per_page=30&sort=updated',
      type:'GET',
      headers: {
        Authorization: `token ${githubToken}`
      }
    }).then(data => { console.log(data)
      repos.all = data
      callback();
    });

  };

  // REVIEW: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = attr => repos.all.filter(repo => repo[attr]);

  module.repos = repos;
})(window);
