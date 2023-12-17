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
  }),

}

async function sendMail2(
  text,
  subject,
  to,
  html = `${text}`,
  from = "yusuftri023@gmail.com"
) {
  let readHtml = fs.readFileSync("../public/texts/index.html");
  const editHtml = readHtml.replace(/email ./, to);
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html: editHtml,
    attachments: [
      {
        filename: "image-1.png",
        path: "../public/texts/images/image-1.png",
        cid: "image1",
      },
      {
        filename: "image-2.png",
        path: "../public/texts/images/image-1.png",
        cid: "image2",
      },
      ,
      {
        filename: "image-3.gif",
        path: "../public/texts/images/image-3.gif",
        cid: "image3",
      },
    ],
  });
}
module.exports = { sendMail,sendMail2 };
