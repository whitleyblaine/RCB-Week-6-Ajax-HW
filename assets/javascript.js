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
  // Allows users to hit "enter" instead of clicking on the button and it won't move to the next page. In my code, even clicking the submit button won't work without this..
  return false;
});

$(document).on('click', '.rapperButton', function() {
  var queryTerm = $(this).text();
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + queryTerm + "&limit=10&api_key=dc6zaTOxFJmzC";
  $.ajax({url: queryURL, method: 'GET'})
    .done(function(response) {
      console.log(response);
      for(i=0; i < 10; i++) {
        var imageURL = response.data[i].images.fixed_width.url;
        var rating = response.data[i].rating;

        var imgText = $('<div>');
        var rapperImage = $('<img>');
        var gifDiv = $('<div>');


        rapperImage.attr('src', imageURL);
        imgText.html('Rating: ' + rating);

        gifDiv.append(imgText);
        gifDiv.append(rapperImage);
        $('#td' + i).html(gifDiv);
      };
    })
})