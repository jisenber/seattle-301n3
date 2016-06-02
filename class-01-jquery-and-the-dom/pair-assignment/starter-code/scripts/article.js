var articles = [];

function Article (opts) {
  // TODO: Use the js object passed in to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.
  this.author = opts.author;
  this.publishedOn = opts.publishedOn;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.authorUrl = opts.authorUrl;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  //selecting article with a class of template then creates a copy of it.
  //take cloned blob and fill in different attributes and content of that blob.
  $newArticle.attr('data-category', this.category);
  $newArticle.find('.byline a').text(this.author);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('.byline a').attr('href', this.authorUrl);
  $newArticle.find('.article-body').html(this.body);

  // TODO: Use jQuery to fill in the template with properties
  // from this particular Article instance. We need to fill in:
  // the author name and url, the article title and body, and the
  // publication date.

  // Include the publication date as a 'title' attribute to show on hover:
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn)

  // Display the date as a relative number of "days ago":
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago')

  $newArticle.append('<hr>');

  // TODO: This cloned article is no longer a template, so we should remove that class...
  $newArticle.removeClass('template');
  return $newArticle;
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  console.log('func1 fire');
});

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
  console.log('func1 fire');
});

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
  console.log('func1 fire');
});
