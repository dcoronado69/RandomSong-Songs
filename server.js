// load the things we need
const express = require("express");
const request = require("request-promise");
const app = express();
let songs = [];
let randNum;

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// index page
app.get("/", function (req, res) {
  res.render("pages/home", { songs: songs, randNum: randNum });
});

// use res.render to load up an ejs view file
app.post("/submit", async (req, res) => {
  const { searchTerm } = req.body;
  songs = [];

  await request(
    `https://itunes.apple.com/search?term=${searchTerm}`,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body);
        if (data.response != "error") {
          data.results.map((song) => {
            if (song.trackName) {
              songs.push(song.trackName);
            }
          });
        } else {
          console.log(data.error);
        }
      }
    }
  );

  res.redirect("/");
});

app.get("/random", async (req, res) => {
  await request(
    `http://localhost:5000/random`,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body);
        if (data.response != "error") {
          randNum = parseInt(data);
        } else {
          console.log(data.error);
        }
      }
    }
  );

  res.redirect("/");
});

app.listen(8080);
console.log("8080 is the magic port");
