//requiring up the requireds
const express = require('express');
const path = require('path');
const port = 8000;
const app = express();
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//setting up the view engine
app.set('view engine','ejs');
app.use(expressLayout);

// setting up the middlewares
app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.setAuthenticatedUser);
app.use(passport.session());
app.use(session({
    name:'dailydiary',
    secret:'jaisingaji',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection:db,
        autoRemove:'disable'
    }),
    function(err){
        console.log(err || 'connect mondo db set-up ok');
    }
}));

//setting up the link and script tags in head and bottom respectively.
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up the routes
app.use('/',require('./routes'));
app.set('views','./views');

//firing up the server
app.listen(port,function(err){
    if(err){
        console.log(`Error in firing up the server, ${err}`);
    }
    console.log(`Server is up and running on port :: ${port}`);
});