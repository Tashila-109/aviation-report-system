const mongoose = require('mongoose')
const shortid = require('shortid')

const ReportSchema = new mongoose.Schema({
    reportID: {
        type: String,
        default: shortid.generate
    },
    reportName: {
        type: String,
        default: 'Report'
    },
    reportTitle: {
        type: String,
        required: true
    },
    name: {
        type: String,
        
    },
    incidents: {
        type: String
    },
    description: {
        type: String,
        
    },
    date: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,      
    },
    airport: {
        type: String,
    },
    occur_date: {
        type: Date,
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
    },
    injuries: {
        type: Number,
        default: 0,
    },
    company: {
        type: String,
    },
    flight_date: {
        type: Date,
    },
    aircraft: {
        type: String,
    },
    flight_number: {
        type: String,
    },
    crew: {
        type: String
    },
    flight_type: [{
        type: String,
    }],
    irregularities: {
        type: String,
    },
    captain_name: {
        type: String,

    },
    officer_name: {
        type: String,
    },
    dateReport: {
        type: Date
    },
    reporter: {
        type: String,
    },
    items: {
        type: String,
    },
    problem_date: {
        type: Date,
    },
    deferred: {
        type: String,
    },
    outcome: {
        type: String,
    },
    airworthiness: {
        type: String,
    },
    ATA_Code: {
        type: Number,
    },
    user: {
        type: String,
        required: true
    },
    attended: {
        type: Boolean,
        default: false
    },
    department: [{
        type: String,

    }],
    priority: {
        type: String
    },
    action: {
        type: String
    },
    hazardControl: {
        type: String
    },
    likelihood: {
        type: String
    },
    consequences: {
        type: String
    }

})

// const AnonymousSchema = new mongoose.Schema({
//     reportID: {
//         type: String,
//         default: shortid.generate
//     },
//     reportName: {
//         type: String,
//         default: 'Anonymous Report'
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     airport: {
//         type: String,
//         required: true
//     },
//     occur_date: {
//         type: Date,
//         required: true
//     },
//     accident_type: [{
//         type: String
//     }],
//     cause: {
//         type: String
//     },
//     deaths: {
//         type: Number,
//         default: 0,
//         required: true
//     },
//     injuries: {
//         type: Number,
//         default: 0,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now()
//     }
// })

// const NormalSchema = new mongoose.Schema({
//     reportID: {
//         type: String,
//         default: shortid.generate
//     },
//     reportName: {
//         type: String,
//         default: 'Normal Report'
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     company: {
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     airport: {
//         type: String,
//         required: true
//     },
//     occur_date: {
//         type: Date,
//         required: true
//     },
//     accident_type: [{
//         type: String
//     }],
//     cause: {
//         type: String
//     },
//     deaths: {
//         type: Number,
//         default: 0,
//         required: true
//     },
//     injuries: {
//         type: Number,
//         default: 0,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now()
//     }
// })

// const CaptainSchema = new mongoose.Schema({
//     reportID: {
//         type: String,
//         default: shortid.generate
//     },
//     reportName: {
//         type: String,
//         default: 'Captain Report'
//     },
//     flight_date: {
//         type: Date,
//         required: true
//     },
//     aircraft: {
//         type: String,
//         required: true
//     },
//     flight_number: {
//         type: String,
//         required: true
//     },
//     crew: {
//         type: String
//     },
//     flight_type: [{
//         type: String
//     }],
//     irregularities: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     captain_name: {
//         type: String,
//         required: true
//     },
//     officer_name: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now()
//     }
// })

// const MaintenanceSchema = new mongoose.Schema({
//     reportID: {
//         type: String,
//         default: shortid.generate
//     },
//     reportName: {
//         type: String,
//         default: 'Maintenance Report'
//     },
//     date:{
//         type: Date,
//         required: true
//     },
//     reporter: {
//         type: String,
//         required: true
//     },
//     items: {
//         type: String,
//         required: true
//     },
//     problem_date: {
//         type: Date,
//         required: true
//     },
//     deferred: {
//         type: String,
//         required: true
//     },
//     outcome: {
//         type: String,
//         required: true
//     },
//     airworthiness: {
//         type: String,
//         required: true
//     },
//     ATA_Code: {
//         type: Number,
//         required: true
//     }
// })



const Report = mongoose.model('Report', ReportSchema)

module.exports = Report