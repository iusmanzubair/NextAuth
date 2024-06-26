import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "mail@revoltinsight.com",
    to: email,
    subject: "Your two factor authentication code",
    html: `<p>Your code: ${token}</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `https://nextauthproject.vercel.app/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@revoltinsight.com",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href=${confirmLink}>here</a> to confirm email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `https://nextauthproject.vercel.app/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@revoltinsight.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href=${resetLink}>here</a> to reset your password.</p>`,
  });
};
