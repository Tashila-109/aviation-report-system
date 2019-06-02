const path = require('path')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const app = express()

// Passport Config
require('../config/passport')(passport)

// DB config - use later for production
const db = require('../config/keys').MongoURI

// Connect to Mongo
mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(error => console.log(error))

// Public Directory
const publicDirectoryPath = path.join(__dirname, '../public')


// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({
    extended: false
}))

// Express Session middleware
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
)

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect Flash
app.use(flash())

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.submit_msg = req.flash('submit_msg')
    res.locals.submit_error_msg = req.flash('submit_error_msg')



    next()
})

// Routes
app.use(express.json())
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/reports', require('./routes/reports'))
// app.use('/admin', require('./routes/admin'))



const port = process.env.PORT

app.listen(port, console.log(`Server started on port ${port}`))