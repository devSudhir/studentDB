const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "c5eb6a34cee0cf", // generated ethereal user
    pass: "3d8d8937546952", // generated ethereal password
  },
});

module.exports = transporter;
