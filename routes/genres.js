//import express and use router instead of app
const express = require('express');
const router = express.Router();
const Joi = require("joi");

//our movie genres data
const genres = [
    { id: 1, genreType: "Action" },
    { id: 2, genreType: "Horror" },
    { id: 3, genreType: "Romance" },
  ];

//http get all request
router.get("/", (req,res)=>{
    res.send(genres);
})

//http get single genre with particular id
router.get("/:id", (req,res)=>{
    //go to genre and find data with particular id
    const genre = genres.find((g) => g.id === parseInt(req.params.id));

    //if genre with requested id is not found
    if(!genre)
        return res.status(404).send("The genre with given ID is not found");

    res.send(genre);

})

//http post request for posting a genre 
router.post("/", (req,res)=>{
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

//http put request for updating the particular genre with given id
router.put("/:id", (req,res) =>{
     //go to genre and find data with particular id
     const genre = genres.find((g) => g.id === parseInt(req.params.id));

     //if genre with requested id is not found
     if(!genre)
         return res.status(404).send("The genre with given ID is not found");
    
    //first validate the put before posting it to the server or database
    const {error} = validateGenre(req.body);

    //if its a bad request , then status is 400
    if (error) return res.status(400).send(error.details[0].message);

    //if everything is good update the genre and send it
    genre.genreType = req.body.genreType;

    res.send(genre);

})

//http delete request for deleting the genre of given id.
router.delete("/:id",(req,res)=>{
    //go to genre and find data with particular id
    const genre = genres.find((g) => g.id === parseInt(req.params.id));

    //if genre with requested id is not found
    if(!genre)
        return res.status(404).send("The genre with given ID is not found");

    //to delete find the index and then use splice to remove it from the genres array
    const index = genres.indexOf(genre,1);
    genres.splice(genre);

    //return the genres
    res.send(genres);

})

//using Joi for validation of the http request
function validateGenre(genre) {
    const schema = Joi.object({
        genreType: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

module.exports = router;