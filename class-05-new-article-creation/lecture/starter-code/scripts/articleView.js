// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};
//empty object that we start attaching things to.
articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

/*
1. creates an empty object called 'articleView'
2. creates a new method called "populateFilters"
3. if this does not have a class that is equal to template
4. the varibale val equals the text value of the 'address a' element on the element in question
5. the variable optionTag equals the start of an option, then the start of the string
plus the value defined above, then end the option
6. select the id of author filter
*/


articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

articleView.initNewArticlePage = function() {
  //initNewArticlePage is the method that is invoked at the bottom of the HTML doc in
  //in the script tag.


  // TODO: Ensure the main .tab-content area is revealed. We might add more tabs later.
  $('.tab-content').show();

  // TODO: Any new article we create will be copy/pasted into our source data file.
  // Set up this "export" functionality. We can hide it for now, and show it once we
  // have data to export. Also, let's add a focus event to help us select and copy the
  // resulting JSON.

  $('#article-export').hide();
  $('#article-json').on('focus', function() {
    this.select();
    //this being the element that is getting focused on, and the select method simulates
    //a double click that you you will select everything.
  });

  // TODO: Add an event handler to update the preview and the export field if any inputs change.
  //we need an event handler on the form so it will render in the preview
  $('#new-form').on('change', 'input, textarea', articleView.create);
    //if there is a change to input or textarea (must be children of the selected element,
    //run this callback function

};

articleView.create = function() {
  // TODO: Set up a var to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview
  var article;
  $('#article-preview').empty();
    // TODO: Instantiate an article based on what's in the form fields:
var obj = {
  title: $('#article-title').val(),
  author: $('#article-author').val(),
  authorUrl: $('#article-author-url').val(),
  category: $('#article-category').val(),
  body: $('#article-body').val(),
  publishedOn: $('#article-published').val()
}

article = new Article(obj)

$('#article-preview').append(article.toHtml())
$('pre code').each(function (i, block) {
  hljs.highlightBlock(block);
});

$('#article-export').show();
$('#article-json').val(JSON.stringify(article) + ", ");

};
  // TODO: Use our interface to the Handblebars template to put this new article into the DOM:

  // TODO: Activate the highlighting of any code blocks (ex:
  /*
  ```
  function example() {
    return 'Hooray! Code highlighting!';
  }
  ```
  */


  // TODO: Export the new article as JSON, so it's ready to copy/paste into blogArticles.js:



articleView.initIndexPage = function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
};
