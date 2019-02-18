function normalizeSong(song) {
  const {
    album: $album,
    albumartist: $albumArtist,
    artist: $artist,
    path: $path,
    title: $title,
    year: $releaseYear
  } = song;

  let normalizedSong = {
    $album,
    $albumArtist,
    $artist,
    $path,
    $title,
    $releaseYear
  };

  if (song.hasOwnProperty("track") && song.track.hasOwnProperty("no")) {
    normalizedSong.$track = song.track.no;
  }

  if (
    song.hasOwnProperty("picture") &&
    typeof song.picture.length === "number" &&
    song.picture.length !== 0 &&
    song.picture[0].hasOwnProperty("data")
  ) {
    normalizedSong.$picture = song.picture[0].data;
  }

  return normalizedSong;
}

module.exports = {
  normalizeSong
};
