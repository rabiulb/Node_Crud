// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();



// Set up mongoose connection
const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://root:JuaRMSFvxQrjhech@cluster0.e86zq.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("coonetion success");
})

var corsOptions = {
    origin: "http://localhost:1234"
  };

  app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))



// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

const product = require('./routes/product.route'); // Imports routes for the products

// initialize our express app


app.use('/products', product);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});