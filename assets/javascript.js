// Variables
var rapperList = ["Lil Wayne", "Kendrick Lamar", "Ghostface Killer", "Lauryn Hill", "Chance the Rapper", "Andre 3000", "Nas", "Rakim", "Eminem", "Jay Z", "Biggie Smalls", "Kanye West"]

function makeButtons() {
  $('#rapperButtons').empty();

  for (i=0; i < rapperList.length; i++) {
    var button = $('<button class="rapperButton">').text(rapperList[i]);
    $('#rapperButtons').append(button);
  }
}

$(document).ready(function() {
  makeButtons();
});


$('#addRapper').on('click', function() {
  var toAdd = $('#rapper-input').val();
  rapperList.push(toAdd);
  makeButtons();
  // Don't refresh the page!
  return false;
});

$(document).on('click', '.rapperButton', function() {
  var queryTerm = $(this).text();
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryTerm + "&limit=10&api_key=dc6zaTOxFJmzC";

  $.ajax({url: queryURL, method: 'GET'})
  .done(function(response) {
    console.log(response);
    for(i=0; i < 10; i++) {
      var stillURL = response.data[i].images.fixed_width_still.url;
      var movingURL = response.data[i].images.fixed_width.url;
      var rating = response.data[i].rating;

      var imgText = $('<div>');
      var rapperImage = $('<img class="rapperImage">');
      var gifDiv = $('<div>');


      rapperImage.attr('src', stillURL);
      rapperImage.attr('data-alt', movingURL);
      imgText.html('Rating: ' + rating);

      gifDiv.append(imgText);
      gifDiv.append(rapperImage);
      $('#td' + i).html(gifDiv);
    };
  });

  $(document).on('click', '.rapperImage', function() {
      currentSrc = $(this).attr('src');
      newSrc = $(this).attr('data-alt');
      $(this).attr('data-alt', currentSrc);
      $(this).attr('src', newSrc);
  });
});