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
  // $('footer').css('opacity', '1');
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
      // console.log(artistIds);
      app.artistIds.forEach((id) => {
        app.getTopAlbum(id);
      })

      if (artistMatch.length === 0) {
        $('.recordWall').append(`<p class="noResults">Sorry friend, no matching records for ${userInput}.</p>`)
      }
      

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

      const albumId = result.topalbums.album[0].mbid;

        if (albumId) {
          app.getTopAlbumInfo(albumId);
        }
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
    // console.log(result);
    app.topAlbumInfo = result;
    
    const albumCover = app.topAlbumInfo.album.image[3]['#text'];
    const albumName = app.topAlbumInfo.album.name;
    const artistName = app.topAlbumInfo.album.artist;
    const artistSearchName = artistName.replace(/\s/g, '%20');
    const albumSearchName = albumName.replace(/\s/g, '%20');
    
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
        <a href=https://open.spotify.com/search/results/${artistSearchName}%20${albumSearchName} target="_blank"><i class="fab fa-spotify"></i>Listen on Spotify</a>
      </div>
    </div>
    `)
  })
}

$('.recordWall').on('click', '.record', function() {
  console.log(this);
  $(this).next().css('display', 'block');
})

$('.recordWall').on('keydown', '.record', function(e) {
  if (e.keyCode === 13) {
    $(this).next().css('display', 'block');
  }
})

$('.recordWall').on('click', '.close', function() {
  $('.modal').css('display', 'none');
})


$('.recordWall').on('click', '.modal', function() {
  $('.modal').css('display', 'none');
})

$('button').on('click', function() {
  $('.themeModal').css('display', 'block');
})


$('.close').on('click', function() {
  $('.themeModal').css('display', 'none');
})

$('.themeModal').on('click', function() {
  $('.themeModal').css('display', 'none');
})

$('.themeOne').on('click', function() {
  $('body').attr('class',"");
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



app.init = function () {

}

//document ready
$(function () {
  app.init();
})
