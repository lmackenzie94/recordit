const app = {};

app.apiKey = "aa0e1ce1cb622fb5704728e8b09bd4bd";
app.url = "https://ws.audioscrobbler.com/2.0/";

// global variable to store user input.
let userInput = '';

//method to store user's input into the user input variable.
app.getUserInput = function () {
  userInput = $('#search').val();
}

// method that returns no more than 15 similar artists based on the user input.
app.getSimilarArtists = function (artist) {
  const similarArtists = $.ajax({
    url: app.url,
    data: {
      api_key: app.apiKey,
      method: 'artist.getsimilar',
      format: 'json',
      artist: artist,
      autocorrect: 1,
      limit: 15
    }
  })
  $.when(similarArtists)
    .then((result) => {
   
        const artistMatch = result.similarartists.artist;
        const artistIdFilter = artistMatch.filter((artist) => {
          return artist.mbid;
        })
        app.artistIds = artistIdFilter.map((id) => {
          return id.mbid;
        })

        // passes each artist ID as argument into getTopAlbum method.
        app.artistIds.forEach((id) => {
          app.getTopAlbum(id);
        })

        // error handling - if user input has no results, append this to the page.
        if (artistMatch.length === 0) {
          $('.recordWall').append(`<p class="noResults">Sorry friend, no matching records for ${userInput}.</p>`)
        }
     
    }).catch(function(error){
        $('.recordWall').append(`<p class="noResults">Whoops! Looks like something went wrong on the server's side. Please try again in a bit.</p>`)
      })
}

// method that returns each similar artists' top album ID.
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

      const albumId = result.topalbums.album[0].mbid;

      // passes each top album ID as argument into getTopAlbumInfo method.
      if (albumId) {
        app.getTopAlbumInfo(albumId);
      }
    })
}

// method that returns info for each top album.
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
      app.topAlbumInfo = result;

      // variables to store various album details.
      const albumCover = app.topAlbumInfo.album.image[3]['#text'];
      const albumName = app.topAlbumInfo.album.name;
      const artistName = app.topAlbumInfo.album.artist;
      const artistSearchName = artistName.replace(/\s/g, '%20');
      const albumSearchName = albumName.replace(/\s/g, '%20');

      // information to be displayed on the page.
      $('.recordWall').append(`
    <div class="record" tabindex="0" role="button" aria-pressed="false">
      <img src=${albumCover} alt='${app.topAlbumInfo.album.name} album cover.'>
      <div class="overlay"><i class="fas fa-compact-disc"></i><p>Learn More</p></div>
    </div>
    <div class ="modal active">
      <div class="modalContent">
        <span class="close">&times;</span>
        <p><span class="bold">Album:</span> ${albumName}</p>
        <p><span class="bold">Artist:</span> ${artistName}</p>
        <a href=https://open.spotify.com/search/results/${artistSearchName}%20${albumSearchName} target="_blank" aria-label="Listen on Spotify"><i class="fab fa-spotify" aria-hidden="true"></i><span>Listen on Spotify</span></a>
      </div>
    </div>
    `)
    })
}

app.init = function () {

  // listen for form submit
  $('form').on('submit', function (event) {
    event.preventDefault();
    app.getUserInput();
    app.getSimilarArtists(userInput);
    $('.recordWall').empty();
  })

  // event handlers 
  $('.recordWall').on('click', '.record', function () {
    $(this).next().css('display', 'block');
  })

  $('.recordWall').on('keydown', '.record', function (e) {
    if (e.keyCode === 13) {
      $(this).next().css('display', 'block');
    }
  })

  $('.recordWall').on('click', '.close', function () {
    $('.modal').css('display', 'none');
  })

  $('.recordWall').on('click', '.modal', function () {
    $('.modal').css('display', 'none');
  })

  $('button').on('click', function () {
    $('.themeModal').css('display', 'block');
  })

  $('.close').on('click', function () {
    $('.themeModal').css('display', 'none');
  })

  $('.themeModal').on('click', function () {
    $('.themeModal').css('display', 'none');
  })

  $('.themeOne').on('click', function () {
    $('body').attr('class', "");
    $('body').addClass('theme1');
  })

  $('.themeTwo').on('click', function () {
    $('body').attr('class', "");
    $('body').addClass('theme2');
  })

  $('.themeThree').on('click', function () {
    $('body').attr('class', "");
    $('body').addClass('theme3');
  })

  $('.themeOne').on('keydown', function (e) {
    if (e.keyCode === 13) {
      $('body').attr('class', "");
      $('body').addClass('theme1');
      $('.themeModal').css('display', 'none');
    }
  })

  $('.themeTwo').on('keydown', function (e) {
    if (e.keyCode === 13) {
      $('body').attr('class', "");
      $('body').addClass('theme2');
      $('.themeModal').css('display', 'none');
    }
  })

  $('.themeThree').on('keydown', function (e) {
    if (e.keyCode === 13) {
      $('body').attr('class', "");
      $('body').addClass('theme3');
      $('.themeModal').css('display', 'none');
    }
  })
}

//document ready
$(function () {
  app.init();
})
