const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../../config/auth')
const { sendEmail, sendNotify } = require('../emails/account')



// Report Model
const Report = require('../models/Report')

// Mandatory Report Page
router.get('/mandatory', ensureAuthenticated, (req, res) => res.render('mandatory', { layout: 'layout-main' }))

// Anonymous Report Page
router.get('/anonymous', ensureAuthenticated, (req, res) => res.render('anonymous', { layout: 'layout-main' }))

// Normal Report Page
router.get('/normal', ensureAuthenticated, (req, res) => res.render('normal', { layout: 'layout-main' }))

// Captains Report page
router.get('/captain', ensureAuthenticated, (req, res) => res.render('captain', { layout: 'layout-main' }))

// Maintenance Report Page
router.get('/maintenance', ensureAuthenticated, (req, res) => res.render('maintenance', { layout: 'layout-main' }))

// Personal Report Page
router.get('/personal', ensureAuthenticated, (req, res) => res.render('personal', { layout: 'layout-main' }))

// Renotify Page
router.get('/renotify', ensureAuthenticated, (req, res) => res.render('renotify', { layout: 'layout-main' }))


// View Reports
router.get('/', ensureAuthenticated, (req, res) => {
    Report.find({user: req.user.id})
    .sort({date:'desc'})
    .then(reports => {
        res.render('reports', {reports: reports, layout: 'layout-home'})
    })
})

// Renotify Reports
router.post('/renotify', (req, res) => {
    const { reportID, description } = req.body
    sendNotify(reportID, description)
    req.flash('submit_msg', `Notification has been sent with regards to Report reference number: ${reportID}.`)
    res.redirect('/reports')
})


// Mandatory Report Handle
router.post('/mandatory', (req, res) => {
    const reportName = 'Mandatory Report'
    const {reportTitle, name, incidents, description } = req.body
    const newReport = new Report({
        reportTitle,
        reportName,
        name,
        incidents,
        description,
        user: req.user.id
    })

    newReport.save()
    .then(report => {
        sendEmail(newReport.reportName, newReport.date, newReport.reportID)
        req.flash('submit_msg', `Report subimitted successfuly! Report reference number is : ${newReport.reportID}.`)
        res.redirect('/reports/mandatory')
    })
    .catch(err => {
        console.log(err)
        req.flash('submit_error_msg', 'Form Subbmission Error. Required Fields are missing.')
        res.redirect('/reports/mandatory')
    })
})

// Anonymous Report Handle
router.post('/anonymous', (req, res) => {
    const reportName = 'Anonymous Report'

    const { reportTitle, title, airport, occur_date, accident_type, cause, deaths, injuries, description, hazardControl, likelihood, consequences } = req.body
    const newReport = new Report({
        reportTitle,
        reportName,
        title,
        airport,
        occur_date,
        accident_type,
        cause,
        deaths,
        injuries,
        description,
        hazardControl,
        likelihood,
        consequences,
        user: req.user.id
    })

    newReport.save()
    .then(report => {
        sendEmail(newReport.reportName, newReport.date, newReport.reportID)
        req.flash('submit_msg', `Report subimitted successfuly! Report reference number is : ${newReport.reportID}.`)
        res.redirect('/reports/anonymous')
    })
    .catch(err => {
        console.log(err)
        req.flash('submit_error_msg', 'Form Subbmission Error. Required Fields are missing.')
        res.redirect('/reports/anonymous')
    })
})

// Normal Report Handle
router.post('/normal', (req, res) => {
    const reportName = 'Normal Report'

    const { reportTitle, name, company, title, airport, occur_date, accident_type, cause, deaths, injuries, description, hazardControl, likelihood, consequences } = req.body
    const newReport = new Report({
        reportTitle,
        reportName,
        name,
        company,
        title,
        airport,
        occur_date,
        accident_type,
        cause,
        deaths,
        injuries,
        description,
        hazardControl,
        likelihood,
        consequences,
        user: req.user.id
    })

    newReport.save()
    .then(report => {
        sendEmail(newReport.reportName, newReport.date, newReport.reportID)
        req.flash('submit_msg', `Report subimitted successfuly! Report reference number is : ${newReport.reportID}.`)
        res.redirect('/reports/normal')
    })
    .catch(err => {
        console.log(err)
        req.flash('submit_error_msg', 'Form Subbmission Error. Required Fields are missing.')
        res.redirect('/reports/normal')
    })
})

// Captain's Report Handle
router.post('/captain', (req, res) => {
    const reportName = 'Captain Report'

    const { reportTitle, flight_date, aircraft, flight_number,  crew, flight_type, irregularities, description, captain_name, officer_name, likelihood, } = req.body
    const newReport = new Report({
        reportTitle,
        reportName,
        flight_date,
        aircraft,
        flight_number,
        crew,
        flight_type,
        irregularities,
        description,
        captain_name,
        officer_name,
        likelihood,
        user: req.user.id
    })

    newReport.save()
    .then(report => {
        sendEmail(newReport.reportName, newReport.date, newReport.reportID)
        req.flash('submit_msg', `Report subimitted successfuly! Report reference number is : ${newReport.reportID}.`)
        res.redirect('/reports/captain')
    })
    .catch(err => {
        console.log(err)
        req.flash('submit_error_msg', 'Form Subbmission Error. Required Fields are missing.')
        res.redirect('/reports/captain')
    })
})

// Maintenance Report Handle
router.post('/maintenance', (req, res) => {
    const reportName = 'Maintenance Report'

    const { reportTitle, dateReport, reporter, items, problem_date, deferred, outcome, airworthiness, ATA_Code, hazardControl, likelihood } = req.body
    const newReport = new Report({
        reportTitle,
        dateReport,
        reportName,
        reporter,
        items,
        problem_date,
        deferred,
        outcome,
        airworthiness,
        ATA_Code,
        hazardControl,
        likelihood,
        user: req.user.id
    })

    newReport.save()
    .then(report => {
        sendEmail(newReport.reportName, newReport.date, newReport.reportID)
        req.flash('submit_msg', `Report subimitted successfuly! Report reference number is : ${newReport.reportID}.`)
        res.redirect('/reports/maintenance')
    })
    .catch(err => {
        console.log(err)
        req.flash('submit_error_msg', 'Form Subbmission Error. Required Fields are missing.')
        res.redirect('/reports/maintenance')
    })
})

// Personal Report Handle
router.post('/personal', (req, res) => {
    const reportName = 'Personal Report'
    const { reportTitle, name, description } = req.body
    const newReport = new Report({
        reportTitle,
        reportName,
        name,
        description,
        user: req.user.id
    })

    newReport.save()
    .then(report => {
        sendEmail(newReport.reportName, newReport.date, newReport.reportID)
        req.flash('submit_msg', `Report subimitted successfuly! Report reference number is : ${newReport.reportID}.`)
        res.redirect('/reports/personal')
    })
    .catch(err => {
        console.log(err)
        req.flash('submit_error_msg', 'Form Subbmission Error. Required Fields are missing.')
        res.redirect('/reports/personal')
    })
})

module.exports = router
