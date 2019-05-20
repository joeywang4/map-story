const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStorage = require('connect-mongo')(session);
const authRoute = require('./routes/auth');
const apiRoute = require('./routes/api');
require('dotenv').config();

// Create server to serve index.html
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.io = io;
const port = process.env.PORT || 3000;

// Connect to mongo
const mongoUrl = process.env.DB_URL;
mongoose.connect(mongoUrl, {useNewUrlParser: true});
db = mongoose.connection;

db.on('error', error => {
    console.log(error);
})
db.once('open', () => {
    console.log('MongoDB connected!');
})

// Socket connection
io.on('connection', socket => {
    socket.on('disconnect', () => {});
})

// Session
app.use(session({
    store: new MongoStorage({mongooseConnection: mongoose.connection}),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 10*60*1000}
}))

// Routing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth', authRoute);
app.use('/api', apiRoute);
app.use(express.static('build'));
app.get('/*', (req, res) => res.sendFile(__dirname+'/build/index.html'));

// Start server listening process.
http.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})