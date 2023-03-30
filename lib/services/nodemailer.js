"use strict";

const { Service } = require("@hapipal/schmervice");
const nodemailer = require("nodemailer");

module.exports = class MailerService extends Service {
  async initializeTransporter() {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.ethereal.email",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass,
      },
    });
  }

  async sendMail(mailOptions) {
    const transporter = await this.initializeTransporter();
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Check mail sent: %s", nodemailer.getTestMessageUrl(info));
      }
    });
  }

  userCreated(emailTo) {
    const mailOptions = {
      from: process.env.SERVER_MAIL || "sender@server.com",
      to: emailTo,
      subject: "New subscription",
      text: "Welcome to us !",
    };

    this.sendMail(mailOptions);
  }

  movieAdd(emailTo, movie) {
    const mailOptions = {
      from: process.env.SERVER_MAIL || "sender@server.com",
      to: emailTo,
      subject: "Movie added",
      text: `Heyy ! New movie, ${movie.title} ${movie.releaseYear} by ${movie.producer}, don't waste any time !`,
    };
    this.sendMail(mailOptions);
  }

  movieUpdate(emailTo, movie) {
    const mailOptions = {
      from: process.env.SERVER_MAIL || "sender@server.com",
      to: emailTo,
      subject: "Movie updated",
      text: `Heyy ! This movie was updated, ${movie.title} ${movie.releaseYear} by ${movie.producer}, don't waste any time !`,
    };
    this.sendMail(mailOptions);
  }
};
