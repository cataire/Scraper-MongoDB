const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs  = require('express-handlebars');
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");

const port = process.env.PORT || 3000;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperdb";

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.redirect('/headlines');
});


app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI).then(() => {
  console.log('mongo connected');
  app.listen(port, function() {
    console.log("App running on port " + port);
  });
}, (err) => {
  if(err) {
    console.log(err);
  }
});
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  axios.get("https://www.theonion.com/c/news-in-brief").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article div div h1").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Headline.create(result)
        .then(function(dbHeadline) {
          // View the added result in the console
          // console.log(dbHeadline);

        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save a Headline, send a message to the client
    console.log("Scrape complete");
    res.redirect("/headlines");
  });
});

app.get("/headlines", function(req, res) {

  db.Headline.find({})
    .then(function(dbHeadline) {
      let hbsObject = {
          headlines: dbHeadline
          };
      res.render("home", hbsObject);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get("/saved", function(req, res) {

  db.Headline.find({saved:true})
    .then(function(dbHeadline) {
      let hbsObject = {
          headlines: dbHeadline
          };
      res.render("saved", hbsObject);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.post("/saved", function (req, res) {
  let savedHeadlineId = req.body.id;
  // let savedHeadlines = {};
  db.Headline.findOneAndUpdate({_id: savedHeadlineId}, {saved: true}, {new: true})
    .then(function(dbHeadline) {
      console.log(dbHeadline);
      res.json(dbHeadline);

    })
    .catch(function(err){
      res.json(err);
    })

})

app.delete("/saved", function(req, res) {
  let savedHeadlineId = req.body.id;
  console.log(savedHeadlineId);
  db.Headline.deleteOne({_id: savedHeadlineId})
  .then(function(){
    res.sendStatus(200);
  })
    .catch(function(err){
      res.json(err);
    })

})


app.get("/headlines/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Headline.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbHeadline) {
      console.log(dbHeadline);

      res.json(dbHeadline);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json("Error: ", err);
    });
});

app.post("/headlines/:id", function(req, res) {
  console.log("What front-end sends: ", req.body);
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      console.log("Server DBNote ", dbNote);
      return db.Headline.findOneAndUpdate({_id: req.params.id }, {note: dbNote._id}, {new: true})
    })

    .then(function(dbHeadline) {
      console.log("Updated headline:", dbHeadline);
      res.json(dbHeadline);
    })

    .catch(function(err) {

      res.json(err);
    });
});
