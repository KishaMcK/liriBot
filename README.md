# Liri Bot

LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data

## What Liri Does

### Twitter
The following comand will show this username's last 20 tweets and when they were created in your terminal/bash window.

```
node liri.js my-tweets <insert Twitter handle>
```

### Spotiphy
The following comand will show the following information about the song in your terminal/bash window

* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

```
node liri.js spotify-this-song <insert song title>
```
#### Note:
If the song is not provided, your program will default to "V. 3005" by [ChildishGambino](https://www.youtube.com/watch?v=tG35R8F2j8k)

### Movies
The following comand will output the following information to your terminal/bash window

* Movie Title
* Year it was released
* Movie Rating
* Country Produced in
* Language
* Movie Plot
* Actors
* Rotten Tomatoe Rating
* Rotten Tomatoe URL

```
node liri.js movie-this <insert movie title>
```
#### Note:
If the user doesn't type a movie in, the program will output data for the movie 'Forrest Gump' by default.

### Prerequisites

You will need [Bash](https://git-scm.com/downloads) in order to get liri downloaded and working for you.

## Author

[Kisha McKechnie](https://kishamck.github.io/myPort/)
