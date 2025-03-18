import nodemailer from 'nodemailer';

export async function sendEmail({ email, subject, message }) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    // console.log(process.env.EMAIL_HOST)
    // console.log(message);
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      text: message,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}