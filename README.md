# Onion Scraper

App that allows a user to scrape The Onion site for article headlines and saves them to Mongo database.

## Basic functionality

When user clicks Scrape button the app uses cheerio to scrape The Onion website for article titles and links. It saves the received data into a Mongo database. The user can save the article to read it later. The saved article screen has an option to add notes to a specific article. User can delete the article from saved articles.

### Technologies used

* JavaScript
* Node.js
* Express.js
* jQuery
* npm packages (cheerio, axios)
* Mongoose
* Handlebars
