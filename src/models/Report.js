const mongoose = require('mongoose')
const shortid = require('shortid')

const MandatorySchema = new mongoose.Schema({
    reportID: {
        type: String,
        default: shortid.generate
    },
    reportName: {
        type: String,
        default: 'Mandatory Report'
    },
    name: {
        type: String,
        required: true
    },
    incidents: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const AnonymousSchema = new mongoose.Schema({
    reportID: {
        type: String,
        default: shortid.generate
    },
    reportName: {
        type: String,
        default: 'Anonymous Report'
    },
    title: {
        type: String,
        required: true
    },
    airport: {
        type: String,
        required: true
    },
    occur_date: {
        type: Date,
        required: true
    },
    accident_type: [{
        type: String
    }],
    cause: {
        type: String
    },
    deaths: {
        type: Number,
        default: 0,
        required: true
    },
    injuries: {
        type: Number,
        default: 0,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const NormalSchema = new mongoose.Schema({
    reportID: {
        type: String,
        default: shortid.generate
    },
    reportName: {
        type: String,
        default: 'Normal Report'
    },
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    airport: {
        type: String,
        required: true
    },
    occur_date: {
        type: Date,
        required: true
    },
    accident_type: [{
        type: String
    }],
    cause: {
        type: String
    },
    deaths: {
        type: Number,
        default: 0,
        required: true
    },
    injuries: {
        type: Number,
        default: 0,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const CaptainSchema = new mongoose.Schema({
    reportID: {
        type: String,
        default: shortid.generate
    },
    reportName: {
        type: String,
        default: 'Captain Report'
    },
    flight_date: {
        type: Date,
        required: true
    },
    aircraft: {
        type: String,
        required: true
    },
    flight_number: {
        type: String,
        required: true
    },
    crew: {
        type: String
    },
    flight_type: [{
        type: String
    }],
    irregularities: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    captain_name: {
        type: String,
        required: true
    },
    officer_name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const MaintenanceSchema = new mongoose.Schema({
    reportID: {
        type: String,
        default: shortid.generate
    },
    reportName: {
        type: String,
        default: 'Maintenance Report'
    },
    date:{
        type: Date,
        required: true
    },
    reporter: {
        type: String,
        required: true
    },
    items: {
        type: String,
        required: true
    },
    problem_date: {
        type: Date,
        required: true
    },
    deferred: {
        type: String,
        required: true
    },
    outcome: {
        type: String,
        required: true
    },
    airworthiness: {
        type: String,
        required: true
    },
    ATA_Code: {
        type: Number,
        required: true
    }
})

const Mandatory = mongoose.model('Mandatory_Report', MandatorySchema)
const Anonymous = mongoose.model('Anonymous_Report', AnonymousSchema)
const Normal = mongoose.model('Normal_Report', NormalSchema)
const Captain = mongoose.model('Captain_Report', CaptainSchema)
const Maintenance = mongoose.model('Maintenance_Report', MaintenanceSchema)

module.exports = { Mandatory, Anonymous, Normal, Captain, Maintenance }