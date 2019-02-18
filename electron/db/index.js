const sqlite3 = require("sqlite3").verbose();

// will create db if it doesn't exist
let db = new sqlite3.Database("./mydb.db", err => {
  if (err) {
    console.log("error", err.message);
  } else {
    console.log("Connected to db");
  }
});

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

module.exports = {
  db
};
