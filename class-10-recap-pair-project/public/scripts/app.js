//on page load, make an ajax request to /api/users and format results as records in the DOM
function loadUsers() {
  $.getJSON('/api/users', function(data) {
    data.rows.forEach(function(ele) {
      var record = '<section><h2>' + ele.name + '</h2></section>'
      $('#user-cards').append($('record'))
    })
  });
}

function clearHTML() {
$('#user-cards').children().remove();
}

$('#user-form').on('submit', function(e) {
  e.preventDefault();
  console.log($(this));
  var name = this.name.value;
  var city = this.city.value;
  var email = this.email.value;

  $.get('/api/users/add', {name: name, city: city, email: email})
  .done(function() {
    clearHTML()
    setTimeout(loadUsers, 100)
  })

  this.name.value = null;
  this.city.value = null;
  this.email.value = null;
});

$.ready(function() {
  $.get('/api/users', function(data) {
    console.log(data);
  });
});
