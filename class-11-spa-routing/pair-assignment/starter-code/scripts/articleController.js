(function(module) {
  var articlesController = {};

  // TODO: Create the `articles` table when the controller first loads, with the code that used to be in index.html:

  // TODO: Setup a function that kicks off the fetching and rendering of articles, using the same
  // code that used to be in index.html.
  // TODO: Also be sure to hide all the main section elements, and reveal the #articles section:
  articlesController.index = function() {
    Article.createTable();
    Article.fetchAll(articleView.initIndexPage);
    $('#about').hide();
    $('#articles').show(); //WOW, megan... what a brilliant mind.
  };

  module.articlesController = articlesController;
})(window);
