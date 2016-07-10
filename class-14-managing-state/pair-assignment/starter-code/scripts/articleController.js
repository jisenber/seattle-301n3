(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //Jacob driving: This function is invoked when the user navigates to the article route and will perform a SQL query via Article.findWhere that will pull article data based on the id property and then on success of the SQL query, the function articleData will be invoked. in Article.findWhere, the first parameter tells us what the field value is that we're looking for, the second argument will be the actual value of that field and then the last argument is the callback function that triggers on success. For our purposes, ctx.params is a fancy way of saying "this". The callback articleData attaches that article data to the context object with a property of article and will then pass it on to the next function which will run on completion of articlesController.loadById. The next function in this case is articlesController.index.
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //Nassir Driving: Like .loadById above, this is function is invoked when a user navigates to an author/ page useing the author's name. Article.findWhere performs an SQL query; the twist here is that the value argument is replacing a "+" symbol with an empty space. We are assuming that the URL cannot take a space and so would be in the format of author/jacob+isenberg, but in the SQL table, the name is in the format "jacob isenberg". As above, this data (all articles written by the author) is attached to the ctx object in the same property "articles", and passed to the articlesController.index, which again is the next() function.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //Nassir Driving: This is the same as the above two functions. It is invoked when the user navigates a category/whatever page. It performs a SQL query based on the category and attaches it to the ctx.articles object/property, then passes that to articlesController.index.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Nassir Driving: .loadAll is invoked on routes.js when the homepage (root) is loaded. This function is using page.js. This function checks if there are objects in the Article.all array, by confirming if it has length. If it does have length, it assumes that an JSON data pull has already occurred to populate Article.all, and it adds this array to the ctx object as a property, "articles". If the Article.all array has no length, Article.fetchAll gets the data. .fetchAll takes an argument of articleData, which is a variable scoped to this function only. articleData attaches the newly-populated Article.all array to the ctx object. In either case, the next function is invoked, which in this case is articlesController.index. tl;dr -- this function takes the Article objects and passes them to articlesController.index as part of the ctx object.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
