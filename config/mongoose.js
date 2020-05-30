//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/todo_list_db');

//aquire the connection to check whether it is successful 
var db = mongoose.connection;

//If there is an error the notifiy for the same
db.on('error', console.error.bind(console, 'database connection error'));

//If it was successful then print the message
db.once('open', function() {
  console.log('we are successfully connected to database!');
});
