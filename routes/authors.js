const express = require("express");
const router = express.Router();
const Author = require("../models/author");

router.get("/", async (req, res) => {
  let searchOptions = {};

  // if it's an empty string we don't filter by name, so we retrieve all of the names
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i"); // case insensitive
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query }); // sending back the query to repopulate the users
  } catch (error) {
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

router.post("/", (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  author
    .save()
    .then((newAuthor) => {
      res.render("authors");
    })
    .catch((err) => {
      res.render("authors/new", {
        author: author,
        errorMessage: "Error Creating Author: " + author.name,
      });
    });
});
module.exports = router;
