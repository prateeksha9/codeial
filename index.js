const express = require ('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const db = require('./config/mongoose');

// extract style and scripts to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.urlencoded());
app.use(cookieParser());

// static files
app.use(express.static('./assets'));

// use express router
app.use('/', require('./routes'))


// set view engine
app.set('view engine', 'ejs')
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`)
    }

    console.log(`Server is running: ${port}`);
})