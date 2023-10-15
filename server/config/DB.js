//database connection
const mongoose = require('mongoose');
const uri = 'mongodb+srv://admin:12345@onlinejudge.uowjlcz.mongodb.net/OnlineJudge?retryWrites=true&w=majority';

//connect
mongoose.connect(uri);

const db = mongoose.connection;

// if errror
db.on('error', console.error.bind('console', 'error conecting DB'));

//connected
db.once('open', () => console.log('Connected to DB!'));