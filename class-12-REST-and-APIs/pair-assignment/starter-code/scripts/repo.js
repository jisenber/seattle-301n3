(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/njisaf/repos' + '?per_page=10&sort=updated',
      type: 'GET',
      headers: {'authorization': 'token 1174020314bd344970d57126d270df7af1995bcf'},
      success: function(data) {
        data.forEach(function(ele) {
          console.log(ele);
        });
      }
    });
    // TODO: How would you like to fetch your repos? Don't forget to call the callback.
    callback;
  };

  // DONE: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
