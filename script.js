const app = {};

//Alanna's API key
app.apiKey = "aa0e1ce1cb622fb5704728e8b09bd4bd";

app.url = "http://ws.audioscrobbler.com/2.0/";

app.userInput;

//method to store user's input into the user input variable
app.getUserInput = function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    app.userInput = $('#search').val();
    console.log(app.userInput);
  })
}

app.init = function() {
  app.getUserInput();
}


//document ready
$(function(){
  app.init();  
})