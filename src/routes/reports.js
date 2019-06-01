const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../../config/auth')
const { sendEmail } = require('../emails/account')



// Report Model
const { Mandatory, Anonymous, Normal, Captain, Maintenance }= require('../models/Report')

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



// Mandatory Report Handle
router.post('/mandatory', (req, res) => {
    const { name, incidents, description } = req.body
    const newReport = new Mandatory({
        name,
        incidents,
        description
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
    const { title, airport, occur_date, accident_type, cause, deaths, injuries, description } = req.body
    const newReport = new Anonymous({
        title,
        airport,
        occur_date,
        accident_type,
        cause,
        deaths,
        injuries,
        description
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
    const { name, company, title, airport, occur_date, accident_type, cause, deaths, injuries, description } = req.body
    const newReport = new Normal({
        name,
        company,
        title,
        airport,
        occur_date,
        accident_type,
        cause,
        deaths,
        injuries,
        description
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
    const { flight_date, aircraft, flight_number,  crew, flight_type, irregularities, description, captain_name, officer_name } = req.body
    const newReport = new Captain({
        flight_date,
        aircraft,
        flight_number,
        crew,
        flight_type,
        irregularities,
        description,
        captain_name,
        officer_name
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
    const { date, reporter, items, problem_date, deferred, outcome, airworthiness, ATA_Code } = req.body
    const newReport = new Maintenance({
        date,
        reporter,
        items,
        problem_date,
        deferred,
        outcome,
        airworthiness,
        ATA_Code
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

module.exports = router
