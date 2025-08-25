import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_TRAP_SMTP_USER!,
    pass: process.env.MAIL_TRAP_SMTP_PASSWORD!,
  },
});
