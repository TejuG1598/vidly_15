//now install and load mongoose
const mongoose = require('mongoose');

//importing express
const express = require("express");

const app = express();

//import the router module
const genres = require("./routes/genres");

//connect to mongoose
mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'))

//set view engine to pug
app.set("view engine", "pug");

//set the path for the pug (this may be optional)
app.set("views", "./views");

// debug import function calling
const startupDebugger = require("debug")("app:startup");

// for post request parse the json object using express middleware
app.use(express.json());

//using the genres router
app.use("/api/genres", genres);

//using the home router
app.get("/", (req, res) => {
  //res.send("Hello World! Welcome to vidly");
  //replace the above with html markup and return it to client first install pug
  res.render("index", {
    title: "My Vidly App",
    message: "Hello this is Tejaswi!",
  });
});

const port = process.env.PORT || 5090;
app.listen(port, () => startupDebugger(`Listening on port ${port}...`));
