require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_ID,
    clientSecret: process.env.OAUTH_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

let mailOptions = {
  to: "yusufmostwanted@gmail.com",
  subject: "Nodemailer Project test",
  text: "Hi from your nodemailer project",
};

transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("Email sent successfully");
    console.log(data);
  }
});
