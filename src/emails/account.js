const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIKey)

const sendEmail = (reportName, date, reportID) => {
    sgMail.send({
        to: 'starbuks1298@gmail.com',
        from: 'avreportsys@gmail.com',
        subject: `${reportName} - Submission`,
        text: `A ${reportName} has been submitted on ${date}.
        The Report reference number is : ${reportID}.`
    })
}

const sendNotify = (reportID, description) => {
    sgMail.send({
        to: 'starbuks1298@gmail.com',
        from: 'avreportsys@gmail.com',
        subject: `Renotification for Report Ref No : ${reportID}`,
        text: `${description}`
    })
}

module.exports = {
    sendEmail,
    sendNotify
}