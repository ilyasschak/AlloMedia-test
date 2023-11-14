const jwt = require('jsonwebtoken');
const { mailVueGenerator , } = require('./emailVueGenerator');

const emailVerificationMessage = (email , subject) => {
    const payload = {
        email
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn : 600,
    })
    const message = {
        from: `Allo Media ${process.env.MAIL_USERNAME}`,
        to: email,
        subject: subject,
        html: mailVueGenerator(token, subject),
    };

    return message;
}


module.exports = {
    emailVerificationMessage,
}