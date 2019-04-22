import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmailVerification = async (
  name: string,
  email: string,
  token: string,
) => {
  const msg = {
    from: 'NodeJS API <no-reply@nodejsapi.com>',
    to: `${name} <${email}>`,
    subject: `Email Verification - ${process.env.APP_NAME}`,
    text: `Verify your email by clicking this link http://localhost:3000/auth/verify-email?token=${token}`,
  };
  sgMail.send(msg);
};

export const sendResetPassword = async (
  name: string,
  email: string,
  token: string,
): Promise<void> => {
  const msg = {
    from: 'NodeJS API <no-reply@nodejsapi.com>',
    to: `${name} <${email}>`,
    subject: `Reset Password - ${process.env.APP_NAME}`,
    text: `Reset your password by clicking this link http://localhost:3000/auth/reset-password?token=${token}`,
  };
  sgMail.send(msg);
};
