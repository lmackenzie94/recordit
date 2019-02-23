const app = {};

//Alanna's API key
app.apiKey = "aa0e1ce1cb622fb5704728e8b09bd4bd";
app.url = "http://ws.audioscrobbler.com/2.0/";

let userInput = '';


//method to store user's input into the user input variable

$('form').on('submit', function (event) {
  event.preventDefault();
  app.getUserInput();
  app.getSimilarArtists(userInput); //moved to here
  app.albumIdArray = [];
  app.finalArray = app.albumIdArray;
  $('.recordWall').empty();
})

app.getUserInput = function () {
  userInput = $('#search').val();
  // app.getSimilarArtists(userInput);
}

app.getSimilarArtists = function (artist) {

  const similarArtists = $.ajax({
    url: app.url,
    data: {
      api_key: app.apiKey,
      method: 'artist.getsimilar',
      format: 'json',
      artist: artist,
      autocorrect: 1,
      limit: 20
    }
  })
  $.when(similarArtists)
    .then((result) => {
      // console.log(result);
      const artistMatch = result.similarartists.artist;
      const artistIdFilter = artistMatch.filter((artist) => {
        return artist.mbid;
      })
      app.artistIds = artistIdFilter.map((id) => {
        return id.mbid;
      })
      // console.log(artistIds);
      app.artistIds.forEach((id) => {
        app.getTopAlbum(id);
      })
    })
}

app.getTopAlbum = function (artistId) {

  const topAlbums = $.ajax({
    url: app.url,
    data: {
      api_key: app.apiKey,
      method: 'artist.gettopalbums',
      format: 'json',
      mbid: artistId,
      limit: 1
    }
  })
  $.when(topAlbums)
    .then((result) => {

      // console.log(result);

      const albumId = result.topalbums.album[0].mbid;
      // console.log(albumId);

      // if (app.albumIdArray.length === app.artistIds.length) {

        if (albumId) {
          // app.albumIdArray.push(albumId);
          app.getTopAlbumInfo(albumId);
        }
      // }
      // app.albumIdArray.forEach((albumId) => {
      // app.getTopAlbumInfo(albumId);
      // })

      // console.log(app.albumIdArray);
      // app.finalArray = app.albumIdArray;
      // console.log(app.finalArray);
          
      // app.cleanedUpArray = app.al

      // app.finalArray = [];
      // $.each(app.albumIdArray, function(i, el){
      //   if($.inArray(el, app.finalArray) === -1) app.finalArray.push(el);
      // })

      // console.log(app.albumIdArray);
    })
}

app.getTopAlbumInfo = function (albumId) {

  const albumInfo = $.ajax({
    url: app.url,
    data: {
      api_key: app.apiKey,
      method: 'album.getinfo',
      format: 'json',
      mbid: albumId,
      limit: 1
    }
  })
  $.when(albumInfo)
  .then((result) => {
    console.log(result);
    $('.recordWall').append(
    `<div>
      <img src=${result.album.image[3]['#text']} alt="${result.album.name} album cover">
      <h2>${result.album.name}</h2>
    
    </div>`);
  })
}

app.init = function () {

}

//document ready
$(function () {
  app.init();
})
