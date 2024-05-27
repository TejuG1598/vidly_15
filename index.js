//importing express
const express = require("express");
const app = express();

//using the home router
app.get("/",(req,res) =>{
    res.send("Hello World! Welcome to vidly");
    //replace the above with html markup and return it to client first install pug 
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));