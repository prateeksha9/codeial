const express = require ('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const db = require('./config/mongoose');

// for session cookie
const session = require('express-session')
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

// extract style and scripts to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//set up SCSS
const sassMiddleware = require('node-sass-middleware')

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix:'/css'


}));

app.use(express.urlencoded());
app.use(cookieParser());

// static files
app.use(express.static('./assets'));


// set view engine
app.set('view engine', 'ejs')
app.set('views', './views');


// mongi store stores the session cookie
app.use(session({
    name: 'codieal',
    // TODO change secret before deployment
    secret: 'something',
    saveUninitialized: false,   //request which is not initialized or user is not logged it
    resave: false,   // identity is established, dont save again and again
    cookie:{
        maxAge: (1000*60*100) //in terms of milisec
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'diabled',
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// use express router
app.use('/', require('./routes'))



app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`)
    }

    console.log(`Server is running: ${port}`);
})