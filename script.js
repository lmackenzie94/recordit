const app = {};

//Alanna's API key
app.apiKey = "aa0e1ce1cb622fb5704728e8b09bd4bd";
app.url = "http://ws.audioscrobbler.com/2.0/";

let userInput = '';

//method to store user's input into the user input variable

$('form').on('submit', function (event) {
  event.preventDefault();
  app.getUserInput();
})

app.getUserInput = function() {
  userInput = $('#search').val();
  // console.log(userInput);
  app.getSimilarArtists(userInput);
}

app.getSimilarArtists = function(artist){
  $.ajax({
    url: app.url,
    data: {
      api_key: app.apiKey,
      method: 'artist.getsimilar',
      format: 'json',
      artist: artist,
      autocorrect: 1,
      limit: 10
    }
  }).then(function (result) {
    // console.log(result.similarartists.artist);
    const artistMatch = result.similarartists.artist;
    // console.log(artistMatch)
   const artistIdFilter = artistMatch.filter((artist) => {
      return artist.mbid;
    })

   const artistIds = artistIdFilter.map((id) => {
      return id.mbid;
    })
    artistIds.forEach((id) => {
      app.getAlbumInfo(id);
    })
    // console.log(artistIds);
  })
}

//this method gets similiar artist recommendations album info
app.getAlbumInfo = function(id){
  $.ajax({
    url: app.url,
    data: {
      api_key: app.apiKey,
      method: 'artist.gettopalbums',
      format: 'json',
      mbid: id,
      limit: 1
    }
  }).then(function(result){
    console.log(result.topalbums);
    const albumArt = 
  })
}

// app.getAlbumInfo("38f59974-2f4d-4bfa-b2e3-d2696de1b675");

//


app.init = function() {
  
}

//document ready
$(function(){
  app.init();  
})