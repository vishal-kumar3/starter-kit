import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmationUrl = `${process.env.AUTH_TRUST_HOST}/auth/verify-email?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Devcord Email Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: #ffffff;
                padding: 30px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .logo {
                text-align: center;
                margin-bottom: 20px;
            }
            .logo img {
                max-width: 150px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #7289da;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <img src="${process.env.AUTH_TRUST_HOST}/images/devcord_1.jpg" alt="Devcord Logo">
            </div>
            <h2>Confirm Your Email Address</h2>
            <p>Hello,</p>
            <p>Thank you for signing up with Devcord! To complete your registration, please click the button below to confirm your email address:</p>
            <p>
                <a href="${confirmationUrl}" class="button">Confirm Email</a>
            </p>
            <p>If you didn't create an account with Devcord, you can safely ignore this email.</p>
            <p>Best regards,<br>The Devcord Team</p>
        </div>
    </body>
    </html>`,
  });
}

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const confirmationUrl = `${process.env.AUTH_TRUST_HOST}/auth/set-password?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Devcord Password Reset</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: #ffffff;
                padding: 30px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .logo {
                text-align: center;
                margin-bottom: 20px;
            }
            .logo img {
                max-width: 150px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #7289da;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <img src="${process.env.AUTH_TRUST_HOST}/images/devcord_1.jpg" alt="Devcord Logo">
            </div>
            <h2>Reset Your Password</h2>
            <p>Hello,</p>
            <p>To reset your password, please click the button below:</p>
            <p>
                <a href="${confirmationUrl}" class="button">Reset Password</a>
            </p>
            <p>If you didn't request a password reset, you can safely ignore this email.</p>
            <p>Best regards,<br>The Devcord Team</p>
        </div>
    </body>
    </html>`,
  });
}
