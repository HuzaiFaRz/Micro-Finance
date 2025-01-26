import nodemailer from "nodemailer";

const sendEmail = (email, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hafizm.furqan456@gmail.com",
      pass: "wupp lqlb llke bzrk",
    },
  });

  const mailOptions = {
    from: "hafizm.furqan456@gmail.com",
    to: email,
    subject: "Loan Application - Login Credentials",
    text: `Your loan application has been processed. Your temporary password is: ${password}. You can use it to log in and reset your password.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error sending email:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export default sendEmail;
