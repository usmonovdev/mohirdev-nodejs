const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs")
const booksJson = path.join(__dirname, "..", "books.json")

router.get("/", (req, res) => {
  fs.readFile(booksJson, "utf8", (err, data) => {
    if (err) {
      return res.status(400).send("Xatolik yuz berdi. Qaytadan urinib ko'ring")
    }

    const books = JSON.parse(data)

    res.status(200).send(books)
  })
});

module.exports = router;
