const nodeMailer = require('nodemailer');

const sendEmail = async( options )=> {

    const transporter = nodeMailer.createTransport( {
        host: "smtp.google.com",
        port: 465,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    })

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;