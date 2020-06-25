//We need to require express if we want to use it as framework for our project
const express = require('express');


//We need to require path to use view files
const path = require('path');


//This is the port we will be using for local host
const port = 8000;


//requiring the mongoose file to access it in this file
const db = require('./config/mongoose')
const Task = require('./models/todo');


//This is for firing up the express server
const app = express();


//This is to tell express that we will be using ejs as our view engine
app.set('view engine', 'ejs');


//This is to set our folder where our view files are present 
app.set('views', path.join(__dirname,'views'));


//This is the middleware which we are using to encode the data we are recieving from form
app.use(express.urlencoded());


//This is to access our static files which we are using to style or project or add some other features using javascript 
// or anything else which is there in the static folder that we will be needing for our project
app.use(express.static('assets'));


//This is the route for home page and the needed response is being send 
app.get('/',function(req,res){

    Task.find({}, function(err,tasks){
        if(err){
            console.log('Error in fetching tasks from db');
        }
        return res.render('home',{
            title:"TODO App",
            todo_list: tasks
        });
    })

});


//This controller is for adding a task 
app.post('/add-task',function(req,res){


    //We will recieve the data submitted by user in the request which is stored in a object body of request so we are
    // processing it and creating a object and sending it to our database
    Task.create({
        DESCRIPTION:req.body.description,
        CATEGORY: req.body.category,
        DATE: req.body.date
        
    }, function(err, newTask){
        if(err){
            console.log('error in creating a task');
            return;
        }
        return res.redirect('back');
    });
});


//for deleting a task
app.get('/delete-task', function(req,res){


    //find the task by id in the database
    let id = req.query.id;
    

    //calling this function to delete that task from the database
    Task.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting the task from database');
            return;
        }


        //after deleting the task go back to home page
        return res.redirect('back');
    });

});


// This will work as default route when page is not found
app.use(function(req, res){
    res.sendStatus(404);
 });


//This is the callback function 
app.listen(port, function(err){
    if(err){
        console.log('Error in running the server', err);
        return;
    }
    console.log('Yup! Express server is up and running on port:', port);
})
