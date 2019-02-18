const sqlite3 = require("sqlite3").verbose();
const { normalizeSong } = require("./normalize");

function getDB() {
  // will create db if it doesn't exist
  return new sqlite3.Database("./mydb.db", err => {
    if (err) {
      console.log("error", err.message);
    } else {
      console.log("Connected to db");
    }
  });
}

function insertSong(song) {
  const normalizedSong = normalizeSong(song);
  const db = getDB();

  const keyReducer = (prev, curr, index) =>
    `${prev}${index !== 0 ? ", " : ""}${curr}`;

  const keys = Object.keys(normalizedSong);

  const columns = keys
    .map(key => key.substring(1, key.length))
    .reduce(keyReducer, "");
  const valueKeys = keys.reduce(keyReducer, "");

  db.run(
    `INSERT INTO songs(${columns}) VALUES (${valueKeys})`,
    normalizedSong,
    error => {
      if (error) {
        console.log("error", error.code);
      }
    }
  );

  db.close();
}

function getSongs() {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.all("SELECT * FROM songs", [], (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });

    db.close();
  });
}

function init() {
  const db = getDB();

  db.run(`CREATE TABLE IF NOT EXISTS songs (
  id Integer PRIMARY KEY AUTOINCREMENT,
  album TEXT,
  albumArtist TEXT,
  artist TEXT,
  path TEXT UNIQUE,
  title TEXT,
  track INTEGER,
  releaseYear INTEGER,
  picture BLOB
)`);

  db.run("CREATE TABLE IF NOT EXISTS langs(name text)");
  // db.run("INSERT INTO langs(name) VALUES(?)", ["test"]);
  db.all("SELECT * FROM langs", [], (err, rows) => {
    console.log("db", rows);
  });

  db.close(err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closed the database connection.");
  });
}

init();

module.exports = {
  getDB,
  insertSong,
  getSongs
};
