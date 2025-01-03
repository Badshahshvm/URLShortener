const express = require("express");
const mongoose = require("mongoose");
const { shortenUrl, redirectUrl } = require("./controller/urlController");
const app = express();
const port = 4000;

mongoose
  .connect("mongodb+srv://badshahshvm766:DNYGqFvNeXXfbrVR@cluster0.fxwdj3v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("server.ejs", { shortUrl: "" });
});

//Haandle the routes

app.post("/shorten", shortenUrl);
//redirect to the original Url:-
app.get("/:shortCode", redirectUrl);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
