var articles = [];

function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toHtml = function() {
  var template = Handlebars.compile($('#article-template').text());
  //doing two things at once: 1st this is that we're evaluating the selector
  /*when you start dropping implicit selectors and expressions, you are more
  likely to get silent errors so beware of this */

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  // TODO: Parse the body content through the markdown library api to render any markdown within a new blog article
this.body = marked(this.body);
  return template(this); /*when we run the toHtml() function, it will take the script
  and will then will render that specific instance*/
};

if (typeof rawData !== 'undefined') {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    articles.push(new Article(ele));
  })
}

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
});
