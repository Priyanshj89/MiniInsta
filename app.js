const express = require('express');
const mongoose = require('mongoose');
const {MONGOURI} = require('./config/keys');
require('./models/user');//this should come before routes
require('./models/post');
const auth = require('./routes/auth');
const post = require('./routes/post');
const user = require('./routes/user');


const app = express(); //invoking express
const PORT = process.env.PORT || 5000;
mongoose.model('User');

mongoose.connect(MONGOURI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false 
});

mongoose.connection.on('connected',()=>{
    console.log("Connected to mongoDb database(ATLAS)");
})
mongoose.connection.on('error',(err)=>{
    console.log("Error connecting",err);
})
mongoose.connection.on('disconnected',()=>{
    console.log("Mongoose is still disconnected");
})

/*
A callback function is a function passed into another function as an argument,
which is then invoked inside the outer function to complete some kind of routine 
or action.
*/

/*middleware is something that modifies the incoming request before it is actually
sent to the route handler
- always used with app.use if required globally
- to use it locally we need to pass it as second parameter in the function
- require a third parameter 'next' to continue the flow of code else server hangs
*/

app.use(express.json());//order matters, first parse then routing
app.use(auth);
app.use(post);
app.use(user);

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT, ()=>{
    console.log("Server has started on port ",PORT);
})

/*
Process
- Starting the server using app.listen
- Connecting to mongoDb using mongoose
- Creating routes using app.use
- creating signup and hashing password to save to database
- creating signin, check email exists, compare password 
- create jwt token on successful signin
- store jwt for particular user using jwt.sign()
- create middleware to protect certain api calls
- middleware - verifies jwt
- deconstruct payload to get particular user details
- create  post schema
- connection of post with user(including use of populate)
- view all post, view my posts
- frontend react
- using materialize, google fonts, unsplash,
- react router dom for routing
- making ui of all the screens we will be using
- making api call to backend using fetch and adding proxy to enable cors
- using toasts and regex
- using useEffect to fetch api's and change acoording to state
- Using Context Api and reducer
  - Contect Api is used to create global variables, using createContext and Provider
  - It can be combined with reducer to do particular action 
  - Used mainly to manage login/out state of user in this project
- Unlike/like api using $push,$pull, exec 
- delete post using remove and using filter function in react
- follow,unfollow array and passing it in state
- my following posts by teversing following array
- profile pic default and update
- Deployment to heroku 
- email for password reset
- posts in top down order
- search functionality
*/