const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const myMail = 'brunoPagno@usp.br'

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: myMail,
        subject: 'Welcome to the Task manager app!',
        text: `Welcome to the app ${name}! Let me know how your experience is going.`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: myMail,
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name} :'( ! I hope to see you back soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}