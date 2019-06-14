const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../../config/auth')

// Comment Model
const Comment = require('../models/Comment')

// Welcome Page
router.get('/', (req, res) => res.render('welcome'))

// Main Page
router.get('/main', ensureAuthenticated, (req, res) => res.render('main', { layout: 'layout-home' }))

// Noticeboard (Comments) Page
router.get('/noticeboard', ensureAuthenticated, (req, res) => {
    Comment.find({})
    .sort({date:'desc'})
    .then( comments => {
        res.render('noticeboard', {
            comments: comments,
            layout: 'layout-home'
        })
    })
})


// Mandatory report Page
//router.get('/mandatory', ensureAuthenticated, (req, res) => res.render('mandatory', { layout: 'layout-main' }))

// Anonymous report Page
//router.get('/anonymous', ensureAuthenticated, (req, res) => res.render('anonymous', { layout: 'layout-main' }))

// Normal Report Page
//router.get('/normal', ensureAuthenticated, (req, res) => res.render('normal', { layout: 'layout-main' }))

// Captains Report Page
//router.get('/captain', ensureAuthenticated, (req, res) => res.render('captain', { layout: 'layout-main' }))

// Maintenance Report Page
//router.get('/maintenance', ensureAuthenticated, (req, res) => res.render('maintenance', { layout: 'layout-main' }))

module.exports = router