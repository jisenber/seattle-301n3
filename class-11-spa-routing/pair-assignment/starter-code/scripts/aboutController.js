(function(module) {
  var aboutController = {};

  // TODO: Define a function that hides all main section elements, and then reveals just the #about section:
  aboutController.index = function() {
    $('.icon-menu li').on('click', function() {
      $('#articles').hide();
      $('#about').show();
    });
  };

  module.aboutController = aboutController;
})(window);
