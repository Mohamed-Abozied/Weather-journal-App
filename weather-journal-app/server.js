// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Initialize the main project folder
app.use(express.static('website'));
// Setup Server





/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());



const port = 3000;
// Starting the server
const server = app.listen(port, ()=>{
    console.log('server running');
    console.log(`running on localhost: ${port}`)});



// get req for the data
app.get('/all', (req, res) => {
    res.send(projectData);
});


//post req and saving them in a variables
app.post('/add', (req, res) => {

    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.feelings = req.body.feelings;
 
    res.send(projectData);
    console.log(projectData);
});


