const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const bookJsonFile = path.join(__dirname, "..", "books.json")

router.get("/add", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "add-book.html"));
});

router.post("/book", (req, res) => {
  const book = req.body;

  if (!book.title || !book.author) {
    return res.status(400).send("Iltimos ma'lumotlarni to'liq kiriting");
  }

  fs.readFile(bookJsonFile, "utf8", (err, data) => {

    if (err) {
      return res.status(400).send("Xatolik yuz berdi. Qaytadan urinib ko'ring")
    }

    const jsonBooks = JSON.parse(data);
    const lastElementId = jsonBooks[jsonBooks.length - 1].id

    jsonBooks.push({
      id: lastElementId + 1,
      title: book.title,
      author: book.author,
    });

    fs.writeFile(bookJsonFile, JSON.stringify(jsonBooks, null, 2), (err) => {
      if (err) {
        return res.status(400).send("Xatolik yuz berdi. Qaytadan urinib ko'ring")
      }
      res.redirect("/");
    })
  });
});

module.exports = router;
