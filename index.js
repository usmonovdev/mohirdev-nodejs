const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();
const booksRoute = require("./routes/book");
const mainRoute = require("./routes/main");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/books", booksRoute);
app.use(mainRoute);

app.listen(PORT, () => {
  console.log(`Server running on PORT: http://localhost:${PORT}`);
});
