//importing express
const express = require("express");
const app = express();

//set view engine to pug 
app.set('view engine', 'pug');

//set the path for the pug (this may be optional)
app.set('views', './views' );

//using the home router
app.get("/",(req,res) =>{
    //res.send("Hello World! Welcome to vidly");
    //replace the above with html markup and return it to client first install pug 
    res.render("index", { title: "My Vidly App", message: "Hello this is Tejaswi!" });

})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));