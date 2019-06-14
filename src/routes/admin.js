const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../../config/auth')

// Report Model
const Report = require('../models/Report')

// Comment Model
const Comment = require('../models/Comment')

// Admin Main Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('admin', { layout: 'layout-home' }))

// Admin Send to department
router.get('/department', ensureAuthenticated, (req, res) => res.render('department', { layout: 'layout-main' }))

// Admin Delete report page
router.get('/delete', ensureAuthenticated, (req, res) => res.render('delete', { layout: 'layout-main' }))

// Admin reports
router.get('/reports', ensureAuthenticated, (req, res) => { res.render('admin-reports', { layout: 'layout-home' })})

// Admin Add Comments page
router.get('/addComment', ensureAuthenticated, (req, res) => { res.render('admin-addcomment', { layout: 'layout-main' })})

// Admin Noticeboard
router.get('/noticeboard', ensureAuthenticated, (req, res) => { 
    Comment.find({})
    .sort({date:'desc'})
    .then( comments => {
        res.render('admin-noticeboard', {
            comments: comments,
            layout: 'layout-home'
        })
    })
})


// Admin Add Comment
router.post('/addComment', ensureAuthenticated, (req, res) => {
    const { reportID, subject, description } = req.body
    const newComment = new Comment({
        reportID,
        subject,
        description,
    })

    newComment.save()
    .then(comment => {

        req.flash('submit_msg', `Comment added to Notice board.`)
        res.redirect('/admin/noticeboard')
    })
    .catch(err => {
        console.log(err)
        req.flash('submit_error_msg', 'Form Subbmission Error. Required Fields are missing.')
        res.redirect('/admin/noticeboard')
    })
})

// Edit Comment
router.get('/editComment/:id', ensureAuthenticated, (req, res) => {
    Comment.findOne({
        _id: req.params.id
    })
    .then (comment => {
        res.render('admin-editcomment', {
            comment: comment,
            layout: 'layout-main'
        })
    })
})

// Edit Comment Process
router.put('/editComment/:id', ensureAuthenticated, (req, res) => {
    Comment.findOne({
        _id: req.params.id
    })
    .then(comment => {
        // new values
        comment.subject = req.body.subject
        comment.description = req.body.description

        comment.save()
        .then(comment => {
            req.flash('submit_msg', 'Comment updated')
            res.redirect('/admin/noticeboard')
        })

    })
})

// Delete Comment
router.delete('/deleteComment/:id', ensureAuthenticated, (req, res) => {
    Comment.deleteOne({_id: req.params.id})
    .then(() => {
        req.flash('submit_msg', 'Comment Deleted');
        res.redirect('/admin/noticeboard');
    })
})

// Report PUT department
router.put('/department', ensureAuthenticated, (req, res) => {
    Report.findOne({
        reportID: req.body.reportID
    })
    .then(report => {
        report.department = req.body.department
        report.priority = req.body.priority

        report.save()
        .then(report => {
            req.flash('submit_msg', 'Report Sent');
            res.redirect('/admin/reports');
        })
    })
})

// Report Delete 
router.delete('/delete', ensureAuthenticated, (req, res) => {
    Report.deleteOne({
        reportID: req.body.reportID
    })
    .then(report => {
        
            req.flash('submit_msg', 'Report Deleted');
            res.redirect('/admin/reports');
    })
})



module.exports = router;