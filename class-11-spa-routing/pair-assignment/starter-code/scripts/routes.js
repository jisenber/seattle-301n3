// TODO: Configure routes for this app with page.js, by registering each URL your app can handle,
// linked to a a single controller function to handle it:

// TODO: What function do you call to activate page.js? Fire it off now, to execute!

page('/', index);
// page('/:about', about);
// page('/:new', new);
page('*', notfound);
page();

articleController.index();
aboutController.index();
