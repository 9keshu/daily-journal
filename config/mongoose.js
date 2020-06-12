const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/daily_journal_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error in Connecting to the Database'));

db.once('open',function(){
    console.log('Connected to the Database :: MongoDB');
});

module.exports = db;