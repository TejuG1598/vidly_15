//importing express
const express = require("express");
const Joi = require("joi");
const app = express();

//set view engine to pug 
app.set('view engine', 'pug');

//set the path for the pug (this may be optional)
app.set('views', './views' );

// debug import function calling
const startupDebugger = require("debug")("app:startup");

// for post request parse the json object using express middleware
app.use(express.json());

//using the home router
app.get("/",(req,res) =>{
    //res.send("Hello World! Welcome to vidly");
    //replace the above with html markup and return it to client first install pug 
    res.render("index", { title: "My Vidly App", message: "Hello this is Tejaswi!" });

});

//our movie generes data
const genres = [
    { id: 1, genreType: "Action" },
    { id: 2, genreType: "Horror" },
    { id: 3, genreType: "Romance" },
  ];

//http get all request
app.get("/api/genres", (req,res)=>{
    res.send(genres);
})

//http get single genre with particular id
app.get("/api/genres/:id", (req,res)=>{
    //go to genre and find data with particular id
    const genre = genres.find((g) => g.id === parseInt(req.params.id));

    //if genre with requested id is not found
    if(!genre)
        return res.status(404).send("The genre with given ID is not found");

    res.send(genre);

})

//http post request for posting a genre 
app.post("/api/genres", (req,res)=>{
    //first validate the post before posting it to the server or database
    const {error} = validateGenre(req.body);

    //if its a bad request , then status is 400
    if (error) return res.status(400).send(error.details[0].message);

    //if everything is good create a genre and send it 
    const genre = {
        id : genres.length + 1,
        genreType: req.body.genreType//in order to make this work, we need to parse the json object
    };
    genres.push(genre);
    res.send(genres);

});

//using Joi for validation of the http request
function validateGenre(genre) {
    const schema = Joi.object({
        genreType: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}


const port = process.env.PORT || 3000;
app.listen(port, () => startupDebugger(`Listening on port ${port}...`));