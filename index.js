const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = 3000;
const ejs = require('ejs');
const bodyParser = require('body-parser');
const connectDB = require('./models/connectMongoDB')
const AnimalsCollection = require('./models/animals');
const mongoose = require('mongoose')
const ejsLint = require('ejs-lint')
const distance = require('geolib')
const zipcodes = require('zipcodes')
const session = require('express-session');
const FileStore = require('session-file-store')(session)
connectDB();

console.log(ejsLint("./views/index.ejs"))

//Middleware
app.use("/views",express.static(__dirname + "/views"))
app.use(session(
    {
        secret: 'hunter2',
        resave: false,
        saveUninitialized: false,
        store: new FileStore(),
    }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

const router = require('./router/router')(app);



server.listen(port, () =>
{
    console.log('Listening on port', port);
})

