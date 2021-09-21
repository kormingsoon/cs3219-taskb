// Import express
let express = require('express');

// Import Body parser
let bodyParser = require('body-parser');

// Import Mongoose
let mongoose = require('mongoose');
let cors = require("cors");

// Initialise the app
let app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
// Connect to Mongoose and set connection variable

mongoose.connect('mongodb+srv://kormingsoon:O4k8UuoHdPgfVLVL@cluster0.opehp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { 
    useNewUrlParser: true
});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 3001;

// Use Api routes in the App
app.use('/', require('./route/api-routes'));

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running cs3219-taskb on port " + port);
});