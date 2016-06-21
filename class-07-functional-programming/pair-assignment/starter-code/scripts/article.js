(function(module) { // TODO: Wrap the entire contents of this file in an IIFE.
// Pass in to the IIFE a module, upon which objects can be attached for later access.
function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.all = [];

Article.prototype.toHtml = function() {
  var template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

Article.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  // DONE: Refactor this forEach code, by using a `.map` call instead, since what we are trying to accomplish
  // is the transformation of one colleciton into another.
  // rawData.forEach(function(ele) {
  //   Article.all.push(new Article(ele));
  // })
  Article.all = rawData.map(function(ele) {
    return new Article(ele);
  });
};

// This function will retrieve the data from either a local or remote source,
// and process it, then hand off control to the View.

// TODO: Refactor this function, and provide it with a parameter of a callback function
//(for now just a placeholder, but to be referenced at call time as a view function)
// to execute once the loading of articles is done. We do this because we might want
// to call other view functions, and not just this initIndexPage() that we are replacing.
// Now, instead of calling articleView.initIndexPage(), we can simply run our callback.
Article.fetchAll = function(callback) {
  if (localStorage.rawData) {
    Article.loadAll(JSON.parse(localStorage.rawData));
    callback();
    //articleView.initIndexPage();
  } else {
    $.getJSON('/data/hackerIpsum.json', function(rawData) {
      Article.loadAll(rawData);
      localStorage.rawData = JSON.stringify(rawData); // Cache the json, so we don't need to request it next time.
      callback();
      //articleView.initIndexPage();
    });
  }
};

// TODO: Chain together a `map` and a `reduce` call to get a rough count of all words in all articles.
Article.numWordsAll = function() {
  return Article.all.map(function(article) {
    return article.body.split(' ').length;
  // Get the total number of words in this article
  })
   .reduce(function(a, b) {
     return a + b; // Sum up all the values in the collection
   });
};

// TODO: Chain together a `map` and a `reduce` call to produce an array of unique author names.
Article.allAuthors = function() {
  return Article.all.map(function(article) {
    return article.author // Don't forget to read the docs on map and reduce!
  })
   .reduce(function(a, b) {
     if (a.indexOf(b) < 0) {
       a.push(b);
     }
      return a;
     }, []);
}

Article.numWordsByAuthor = function() {
  // TODO: Transform each author string into an object with 2 properties: One for
  // the author's name, and one for the total number of words across all articles written by the specified author.
   return Article.allAuthors().map(function(author) {
     return {
       authorName: author,
       authorWordCount: Article.all.reduce(function(a, b) {
         if (b.author === author) {
           a.push(b.body.split(' ').length)
         }
          return a;
        },[]).reduce(function(a,b) {
          return a + b;
        })
  //     // someKey: someValOrFunctionCall().map(...).reduce(...), ...
     }
})
};

//step by step of numWordsByAuthor:
//return the array of authors with the allAuthors() method, and create a new
//object with the .map method to make an object with two properties.
//The first property is the author name, which happens to be the parameter
//the second property is a doosy. The second property is the word count Which
//is obtained by grabbing all the articles with the Article.all array and running
//a reduce method which takes two parameters. remember: a is the counter Which
//defaults at zero unless specified otherwise at the end of the method. b is The
//instance within the array being iterated through. if the author on the instance
//of that article equals the author (parameter), then push the number of words to
//an empty array which is a (defined before the second reduce). Then you have an
//array of articles for each article with the word count for each article.
//Then take that array of values and add together all the values to make one values
//(not an array).

module.Article = Article;

 })(window);
