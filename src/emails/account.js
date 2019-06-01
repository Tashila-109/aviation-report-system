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

module.exports = {
    sendEmail
}