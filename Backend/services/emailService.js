import nodemailer from 'nodemailer';

const getTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email service is not configured. Set EMAIL_USER and EMAIL_PASS in Backend/.env.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOtpEmail = async ({ email, otp, purpose }) => {
  const isPasswordReset = purpose === 'password-reset';
  const action = isPasswordReset ? 'reset your Placement Portal password' : 'verify your Placement Portal email address';

  await getTransporter().sendMail({
    from: `Placement Portal <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Your OTP to ${action}`,
    html: `<p>Use this one-time password to ${action}:</p><p style="font-size: 24px; font-weight: 700; letter-spacing: 4px;">${otp}</p><p>This code expires in 5 minutes. Do not share it with anyone.</p>`,
  });
};
