// TODO: Configure routes for this app with page.js, by registering each URL your app can handle,
// linked to a a single controller function to handle it:

// TODO: What function do you call to activate page.js? Fire it off now, to execute!

(function() {
  page('/', articlesController.index);
  page('/about', aboutController.index);
  // page('/:new', new);
  page('*', function() {
    console.log('not found');
  });
  page();
})();
