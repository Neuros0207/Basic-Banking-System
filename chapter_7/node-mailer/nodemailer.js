require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  const pdf = fs.readFileSync(
    "./FOR STUDENTS [FGA BATCH 4 2023] Challenge BE JS Chapter 7.pdf"
  );
  const image = fs.readFileSync("./Backend Engineering Bootcamp (21).png");
  // send mail with defined transport object

  const info = await transporter.sendMail({
    from: "yusuftri023@gmail.com", // sender address
    to: "yusufmostwanted@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    attachments: [
      {
        filename: "Backend Engineering Bootcamp (21).png",
        path: "./Backend Engineering Bootcamp (21).png",
        contentType: "image/png",
      },
      {
        filename: "challenge be js.pdf",
        content: pdf,
        contentType: "application/pdf",
      },
      {
        filename: "Backend Engineering Bootcamp.png",
        content: image,
        contentType: "image/png",
      },
    ],
  });
}

module.exports = { sendMail };
