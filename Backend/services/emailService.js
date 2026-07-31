import nodemailer from "nodemailer";

const getTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error(
      "Email service is not configured. Set EMAIL_USER and EMAIL_PASS."
    );
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true only for port 465
    family: 4,      // 👈 Force IPv4
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOtpEmail = async ({ email, otp, purpose }) => {
  const action =
    purpose === "password-reset"
      ? "reset your Placement Portal password"
      : "verify your Placement Portal email address";

  await getTransporter().sendMail({
    from: `Placement Portal <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Your OTP to ${action}`,
    html: `
      <p>Use this one-time password to ${action}:</p>
      <h2>${otp}</h2>
      <p>This code expires in 5 minutes.</p>
    `,
  });
};