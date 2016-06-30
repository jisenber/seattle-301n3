(function(module) {

  var stateObj = {};

(function() {
    var stateArr = [];
    webDB.execute('SELECT DISTINCT state FROM zips ORDER BY state ASC;', function(data) {
      data.map(function(a) {
        stateArr.push(a.state);
      });
      stateArr.forEach(function(state){
        var stateOption = '<option value="' + state + '">' + state + '</option>';
        $('#state-select').append(stateOption);
      });
    });
  })();

  stateObj.populateCities = function() {
    $('#state-select').on('change', function() {
      var cityArr = [];
      $('#citySelect').siblings().remove();
      webDB.execute('SELECT DISTINCT city from zips WHERE state = "' + $(this).val() + '";', function(cityData) {
        cityData.map(function(a) {
          cityArr.push(a.city);
        });
        cityArr.forEach(function(city){
          var cityOption = '<option value="' + city + '">' + city + '</option>';
          $('#city-select').append(cityOption);
        });
      });
    });
  };

  $('#zipForm').on('submit', function(e) {
    e.preventDefault();
    webDB.execute('SELECT latitude, longitude FROM zips WHERE zip = "' + $('#zipInput').val() + '";',
  function(data) {
    initMap(data);
  });
  });

  $('#city-select').on('change', function() {
    webDB.execute('SELECT latitude, longitude FROM zips WHERE city = "' + $('#city-select').val() + '" AND state = "' + $('#state-select').val() + '"',
    function(data) {
      initMap(data);
    });
  });

  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here

//instead, query the database to get the list of all states on page load, and then query the database again to get a list of cities once the user selects a state. Log the list of matching cities to the console.
  stateObj.populateCities();
  module.stateObj = stateObj;
})(window);
