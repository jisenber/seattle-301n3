(function(module) {

 var stateObj = {};
var stateArr = [];
var cityArr = [];

stateObj.populateStates = function() {
  webDB.execute('SELECT DISTINCT state FROM zips ORDER BY state ASC;', function(callback) {
    callback.map(function(a) {
      stateArr.push(a.state)
    });
    stateArr.forEach(function(state){
    stateOption = '<option value"' + state + '">' + state + '</option>'
    $('#state-select').append(stateOption);
  });
  });
};

stateObj.populateCities = function() {
  $('#state-select').on('change', function() {
    $('#citySelect').siblings().remove();
    cityArr = [];
    webDB.execute('SELECT DISTINCT city from zips WHERE state = "'  + $(this).val() + '";', function(cityData) {
      cityData.map(function(a) {
        cityArr.push(a.city)
      })
      cityArr.forEach(function(city){
      cityOption = '<option value"' + city + '">' + city + '</option>'
      $('#city-select').append(cityOption);
      })
    })
  });
}


  $('#zipForm').on('submit', function(e) {
  e.preventDefault()
  webDB.execute('SELECT latitude, longitude FROM zips WHERE zip = "'  + $('#zipInput').val() + '";',
  function(data) {
   initMap(data)
 });
  });


  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here

//instead, query the database to get the list of all states on page load, and then query the database again to get a list of cities once the user selects a state. Log the list of matching cities to the console.
stateObj.populateStates();
stateObj.populateCities();
module.stateObj = stateObj;
})(window)
