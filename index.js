// Import express
let express = require('express');

// Import Body parser
let bodyParser = require('body-parser');

// Import Mongoose
let mongoose = require('mongoose');

// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./route/api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/goto', apiRoutes);

// Configure app to handle rout errors
app.use('/', (req, res, next) => {
    try {
        throw new Error("Invalid page")
    } 
    catch (error) {
        next(error)
    }
})

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: "An error occured!"});
 })

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running cs3219-taskb on port " + port);
});