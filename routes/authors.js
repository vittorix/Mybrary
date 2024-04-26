const express = require("express");
const router = express.Router();
const Author = require("../models/author");

router.get("/", (req, res) => {
  res.render("authors/index");
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
