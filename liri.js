//reads and sets environment variables
require("dotenv").config();
//the following code imports node-spotify-api, api keys, axios, moment, fs.
var Spotify = require("node-spotify-api");
var keys = require("./key.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

//~~~~FUNCTIONS~~~~~

//gets the artist name
var artistName = function(artist) {
  return artist.name;
};
//runs search
var getSpotify = function(songTitle) {
  if (songTitle === undefined) {
    songTitle = "V. 3005";
  }

  spotify.search(
    {
      type: "track",
      query: songTitle
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(artistName));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    }
  );
};

var getMyBands = function(artist) {
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(
    function(response) {
      var jsonData = response.data;

      if (!jsonData.length) {
        console.log("No results found for " + artist);
        return;
      }
      console.log("Upcoming concerts for " + artist + ":");

      for (var i = 0; i < jsonData.length; i++) {
        var show = jsonData[i];

        //prints info about concerts
        console.log(
          show.venue.city +
            "," +
            (show.venue.region || show.venue.country) +
            " at " +
            show.venue.name +
            " " +
            moment(show.datetime).format("MM/DD/YYYY")
        );
      }
    }
  );
};

//Function that runs Movie Search
var getMeMovie = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }

  var urlHit =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  axios.get(urlHit).then(
    function(response) {
      var jsonInfo = response.data;

      console.log("Title: " + jsonInfo.Title);
      console.log("Year: " + jsonInfo.Year);
      console.log("Rated: " + jsonInfo.Rated);
      console.log("IMDB Rating: " + jsonInfo.imdbRating);
      console.log("Country: " + jsonInfo.Country);
      console.log("Language: " + jsonInfo.Language);
      console.log("Plot: " + jsonInfo.Plot);
      console.log("Actors: " + jsonInfo.Actors);
      console.log("Rotten Tomatoes Rating: ",jsonInfo.Ratings[Math.min(1,jsonInfo.Ratings.length-1)].Value);
    }
  );
};

//runs a command based on random.txt file
var runThis = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      choice(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      choice(dataArr[0]);
    }
  });
};

//resolves what comand is ran
var choice = function(caseData, functionData) {
  switch (caseData) {
  case "concert-this":
    getBands(functionData);
    break;
  case "spotify-this-song":
    getSpotify(functionData);
    break;
  case "movie-this":
    getMovie(functionData);
    break;
  case "do-what-it-says":
    runThis();
    break;
    case "beautiful-life":
    beautifullife();
    break;
  default:
    console.log("LIRI doesn't know that");
  }
};

//takes in command line arguments and exicutes corect function
var runIt = function(argOne, argTwo) {
  choice(argOne, argTwo);
};

// MAIN PROCESS
runIt(process.argv[2], process.argv.slice(3).join(" "));

