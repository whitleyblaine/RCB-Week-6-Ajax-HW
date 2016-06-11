// Variables
var rapperList = ["Lil Wayne", "Kendrick Lamar", "Ghostface Killer", "Lauryn Hill", "Chance the Rapper", "Andre 3000", "Nas", "Rakim", "Eminem", "Jay Z", "Biggie Smalls", "Kanye West"]
var queryTerm;

// Functions

var makeButtons = function() {
  $('#rapperButtons').empty();

  for (i=0; i < rapperList.length; i++) {
    var button = $('<button class="rapperButton">').text(rapperList[i]);
    $('#rapperButtons').append(button);
  }
}

var ajaxCall = function(queryTerm, numGifs) {
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryTerm + "&limit=" + numGifs + "&api_key=dc6zaTOxFJmzC";

  $.ajax({url: queryURL, method: 'GET'})
  .done(function(response) {
    console.log(response);
    for(i=0; i < numGifs; i++) {
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
}

// Load initial buttons
$(document).ready(function() {
  makeButtons();
});

// Add a rapper button by clicking submit
$('#addRapper').on('click', function() {
  var toAdd = $('#rapper-input').val();
  rapperList.push(toAdd);
  makeButtons();
  // Don't refresh the page!
  return false;
});

// perform ajax call to retrieve gifs by clicking desired rapper button
$(document).on('click', '.rapperButton', function() {
  queryTerm = $(this).text();
  $('td').html('');
  $('#loadMore').removeClass('hide');

  ajaxCall(queryTerm, 10);

  $(document).on('click', '#loadMore', function() {
    $('#loadMore').addClass('hide');
    ajaxCall(queryTerm, 20);
  });
});

// pause & restart gif on click
$(document).on('click', '.rapperImage', function() {
  currentSrc = $(this).attr('src');
  newSrc = $(this).attr('data-alt');
  $(this).attr('data-alt', currentSrc);
  $(this).attr('src', newSrc);
});