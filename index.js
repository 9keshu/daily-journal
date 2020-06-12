//requiring up the requireds
const express = require('express');
const path = require('path');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');

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