const mongoose = require('mongoose');

//This is the schema in which we want our data to be stored
const taskSchema = new mongoose.Schema({
    DESCRIPTION:{
        type: String,
        required: true
    },
    CATEGORY:{
        type: String,
        required: true
    },
    DATE:{
        type: String,
        required: true
    }
});

//This is what we want to export when this file will be accessed in index.js 
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
