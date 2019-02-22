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
      limit: 10
    }
  })
  $.when(similarArtists)
    .then((result) => {
      console.log(result);
      const artistMatch = result.similarartists.artist;
      const artistIdFilter = artistMatch.filter((artist) => {
        return artist.mbid;
      })
      const artistIds = artistIdFilter.map((id) => {
        return id.mbid;
      })
      console.log(artistIds);
      // artistIds.forEach((id) => {
      //     app.getTopAlbum(id);
      // })
      let test = app.getTopAlbum(...artistIds);
      console.log(test);
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
      console.log(result);
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
      // limit: 1
    }
  })
  $.when(albumInfo)
    .then((result) => {
      console.log(result);
    })
}


// app.similarArtists = $.ajax({
//     url: app.url,
//     data: {
//         api_key: app.apiKey,
//         method: 'artist.getsimilar',
//         format: 'json',
//         artist: userInput,
//         autocorrect: 1,
//         limit: 10
//     }
// })

// app.getTopAlbum = $.ajax({
//   url: app.url,
//   data: {
//     api_key: app.apiKey,
//     method: 'artist.gettopalbums',
//     format: 'json',
//     mbid: artistId,
//     limit: 1
//   }
// });

// app.getTopAlbumInfo = $.ajax({
//   url: app.url,
//   data: {
//     api_key: app.apiKey,
//     method: 'album.getinfo',
//     format: 'json',
//     mbid: albumId,
//     // limit: 1
//   }
// });

// $.when(app.similarArtists).then((result) => {
//     console.log(result);
// })










//this method returns the top 10 similar artist results to the user's input
// app.getSimilarArtists = function(artist) {
//   $.ajax({
//     url: app.url,
//     data: {
//       api_key: app.apiKey,
//       method: 'artist.getsimilar',
//       format: 'json',
//       artist: artist,
//       autocorrect: 1,
//       limit: 10
//     }
//   }).then(function(result) {
//     // console.log(result.similarartists.artist);
//     //this variable stores the artist array
//     const artistMatch = result.similarartists.artist;
//     // console.log(artistMatch)
//     //this variable is created from the filter method on the artist match array. the filter loops through each array and only returns the ones that have an mbid(artist id)
//     const artistIdFilter = artistMatch.filter((artist) => {
//       return artist.mbid;
//     })

//     //this variable is an array of ids of the artists that had ids
//     const artistIds = artistIdFilter.map((id) => {
//       return id.mbid;
//     })

//     // console.log(artistIds);

//     //each id is passed through as an argument in the getTopAlbum method.
//     artistIds.forEach((id) => {
//       app.getTopAlbum(id);
//     })
//     // console.log(artistIds);
//   })
// }

// //this method gets similiar artist recommendations album info
// // this id refers to the artist id
// app.getTopAlbum = function(artistId) {
//   $.ajax({
//     url: app.url,
//     data: {
//       api_key: app.apiKey,
//       method: 'artist.gettopalbums',
//       format: 'json',
//       mbid: artistId,
//       limit: 1
//     }
//   }).then(function (result) {
//     const topAlbumID = result.topalbums.album[0].mbid;
//     // console.log(topAlbumID);
//     app.getTopAlbumInfo(topAlbumID);
//   })
// }

// //this method is to get the album info of the top album for each artist. we need to pass the mbid of the top album as the argument in this method
// //using the album id from GetTopAlbums, pass through GetTopAlbumInfo to get cover art, track list, etc.
// app.getTopAlbumInfo = function(albumId) {
//   $.ajax({
//     url: app.url,
//     data: {
//       api_key: app.apiKey,
//       method: 'album.getinfo',
//       format: 'json',
//       mbid: albumId,
//       // limit: 1
//     }
//   }).then(function (result) {
//     console.log(result.album.name);
//   })
// }

//the getSimilarArtists function returns 10 artists similar to the artist the user inputted
//the artistIds is an array of just the mbid's of those 10 artists
//the getTopAlbum function takes an argument of artistID and returns the 1 top album of each artist (the ID's are passed into it one by one using a forEach loop)
//the getTopAlbum function returns the album mbid of the top album from each artist, which is then passed into the getTopAlbumInfo function.
//the getTopAlbumInfo function returns an object of info for each top album.



app.init = function () {

}

//document ready
$(function () {
  app.init();
})