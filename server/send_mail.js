'use strict';
const nodemailer = require('nodemailer');

module.exports.sendMail = async (req, res) => {
  const { name, email, message, recaptchaValue } = req.body.info;

  const smtpConfig = {
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.MAILPASS,
    },
  };

  if (!recaptchaValue) {
    return res.send({ error: 'Please check the captcha' });
  }

  const transporter = nodemailer.createTransport(smtpConfig);

  try {
    await transporter.sendMail({
      to: process.env.DEV_EMAIL,
      subject: 'Incubo Development Inquiry',
      html: `
      <p>From: ${name} - ${email}</p>
      <p>${message}</p>
    `,
    });

    res.send({ ok: "Thanks got it! I'll be in touch." });
  } catch (err) {
    console.error(err.message);
    res.send({
      error: 'There was a problem sending your email. Please try again later.',
    });
  }
};
