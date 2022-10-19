//1.Require the express library from the express dependency
const express = require('express');
const app = express();

//------Cookie Parser------------->
const cookieParser = require('cookie-parser');
app.use(cookieParser())
//------Custom Middleware---------
app.use((req, res, next) =>  {
    const username = req.cookies.username
    res.locals.username = '';
    if(username){
        res.locals.username = username;
        console.log(`Signed in as ${username}`)
    }
    next();
})
//==============================Middleware======
app.use(express.urlencoded({extended: true}))
//------Static assets-------------
const path = require("path")
app.use(express.static(path.join(__dirname, 'public')));

//------Logging Middleware Morgan--------
const logger = require('morgan');
app.use(logger('dev'));



//=====================ROUTES/ ROUTERS
// root page
app.get('/', (req, res) => {

    res.render('sign_in') 
})

//sign_in page
app.get('/sign_in', (req, res) => {

    res.render('sign_in') 

})


// ------Sign in POST request---------------->
app.post('/sign_in', (req, res) => {
    // res.send(req.body) //-> this is available through urlencoded
    // forms using POST send data as x-www-urlencoded
    // data is formatted as key=value separated by & where speical chars. are replaced
    // name attribute in html form will be the property in parameters
    const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 //a day in milliseconds
    const username = req.body.username
    res.cookie('username', username, {maxAge: COOKIE_MAX_AGE})
    res.redirect('/')
})

// -------Sign out POST request------------->
app.post('/sign_out', (req, res) => {
    res.clearCookie('username');
    res.redirect('/');
})


//---------------POST ROUTER ACCESSING POST ROUTES------------------>
const postRouter = require('./routes/posts')
app.use('/posts', postRouter)

//---Set View Engine----------->
app.set('view engine', 'ejs')
app.set('views', 'views')

//==============================SERVER===================================>
const PORT = 3000;
const DOMAIN = 'localhost' //loopback address: 127.0.0.1

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})
