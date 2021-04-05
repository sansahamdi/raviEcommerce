const nodemailer = require("nodemailer");

const sendEmail = (option) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: option.email,
    subject: option.subject,
    html: `
    <div>
    <h1>Don't miss your code</h1>
      <ul>
        <li style={{listDecoration:'none'}}> user :  ${option.email} </li>
        <h3> ${option.message}</h3>
      </ul>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = sendEmail;
