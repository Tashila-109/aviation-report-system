const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../../config/auth')

// Report Model
const Report = require('../models/Report')

// Quality Assurance Page
router.get('/qualityAssurance', ensureAuthenticated, (req, res) => res.render('quality-assurance', { layout: 'layout-home' }))

// Engineering Page
router.get('/engineering', ensureAuthenticated, (req, res) => res.render('engineering', { layout: 'layout-home' }))

// flight-operations Page
router.get('/flightOperations', ensureAuthenticated, (req, res) => res.render('flight-operations', { layout: 'layout-home' }))

// Airport Services Page
router.get('/airportServices', ensureAuthenticated, (req, res) => res.render('airport-services', { layout: 'layout-home' }))

// Human resources Page
router.get('/humanResources', ensureAuthenticated, (req, res) => res.render('human-resources', { layout: 'layout-home' }))

// Purchasing Page
router.get('/purchasing', ensureAuthenticated, (req, res) => res.render('purchasing', { layout: 'layout-home' }))

// Finance Page
router.get('/finance', ensureAuthenticated, (req, res) => res.render('finance', { layout: 'layout-home' }))


// Action Report Page
router.get('/action', ensureAuthenticated, (req, res) => res.render('action', { layout: 'layout-main' }))

// Action Report POST
router.put('/action', ensureAuthenticated, (req, res) => {
    Report.findOne({
        reportID: req.body.reportID
    })
    .then(report => {
        report.attended = req.body.attended
        report.action = req.body.action

        report.save()
        .then(report => {
            req.flash('submit_msg', 'Report Sent');
            res.redirect('/admin/reports');
        })
    })
})






module.exports = router;