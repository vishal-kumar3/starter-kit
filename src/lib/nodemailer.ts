import nodemailer from "nodemailer";

const getNodemailerUser = () => {
  if (process.env.NODEMAILER_EMAIL) {
    return process.env.NODEMAILER_EMAIL;
  } else {
    throw new Error("NODEMAILER_EMAIL is not defined");
  }
}

const getNodemailerPass = () => {
  if (process.env.NODEMAILER_EMAIL_PASS) {
    return process.env.NODEMAILER_EMAIL_PASS;
  } else {
    throw new Error("NODEMAILER_EMAIL_PASS is not defined");
  }
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: getNodemailerUser(),
    pass: getNodemailerPass()
  }
})

export const mailOptions = {
  from: 'Devcord Team <no-reply@Devcord.vercel.app>'
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationUrl = `${process.env.AUTH_TRUST_HOST}/auth/verify-email?token=${token}`

  await transporter.sendMail({
    ...mailOptions,
    to: email,
    subject: 'Confirm your email',
    text: 'This is string',
    html: `
      <!doctype html>
      <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
        <style amp-custom>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #555555;
            margin: 0;
            padding: 0;
            background-color: #f6f9fc;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .email-body {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          h1 {
            color: #333333;
            text-align: center;
            margin-bottom: 30px;
            font-size: 24px;
            font-weight: bold;
          }
          .cta-button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            margin: 30px 0;
          }
          .next-steps {
            background-color: #f8f8f8;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 30px;
          }
          .next-steps h2 {
            color: #333333;
            font-size: 18px;
            margin-bottom: 15px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #999999;
            margin-top: 30px;
            border-top: 1px solid #eeeeee;
            padding-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email-body">
            <amp-img src="${process.env.AUTH_TRUST_HOST}/images/devcord_1.jpg" alt="Devcord Logo" width="150" height="50" layout="responsive"></amp-img>
            <h1>Verify Your Devcord Account</h1>
            <p>Hello <span id="username">${email}</span>,</p>
            <p>Welcome to Devcord, the premier chat application for developers. We're thrilled to have you join our community!</p>
            <p>To get started and unlock all features, please verify your email address:</p>
            <div style="text-align: center;">
              <a href=${confirmationUrl} class="cta-button">Verify Email Now</a>
            </div>
            <p>Button not working? Copy and paste this link into your browser:</p>
            <p id="verificationLinkText" style="word-break: break-all; color: #0066cc;">${confirmationUrl}</p>
            <div class="next-steps">
              <h2>What's next?</h2>
              <ul>
                <li>Complete your developer profile</li>
                <li>Join coding channels that interest you</li>
                <li>Start collaborating with fellow developers</li>
              </ul>
            </div>
            <p>If you didn't create an account on Devcord, please disregard this email.</p>
            <div class="footer">
              <p>
                This is an automated message. Please do not reply to this email.<br>
                If you need assistance, contact our support team at <a href="mailto:kumarvishal823003@gmail.com" style="color: #0066cc;">support@devcord.vercel.app</a>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  })
}


export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmationUrl = `${process.env.AUTH_TRUST_HOST}/auth/set-password?token=${token}`

  await transporter.sendMail({
    ...mailOptions,
    to: email,
    subject: 'Change your password',
    text: 'This is string',
    html: `
      <!doctype html>
      <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
        <style amp-custom>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #555555;
            margin: 0;
            padding: 0;
            background-color: #f6f9fc;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .email-body {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          h1 {
            color: #333333;
            text-align: center;
            margin-bottom: 30px;
            font-size: 24px;
            font-weight: bold;
          }
          .cta-button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            margin: 30px 0;
          }
          .password-tips {
            background-color: #f8f8f8;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 30px;
          }
          .password-tips h2 {
            color: #333333;
            font-size: 18px;
            margin-bottom: 15px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #999999;
            margin-top: 30px;
            border-top: 1px solid #eeeeee;
            padding-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email-body">
            <amp-img src="${process.env.AUTH_TRUST_HOST}/images/devcord_1.jpg" alt="Devcord Logo" width="150" height="50" layout="responsive"></amp-img>
            <h1>Reset Your Devcord Password</h1>
            <p>Hello <span id="username">${email}</span>,</p>
            <p>We received a request to reset your password for your Devcord account. If you didn't make this request, please ignore this email.</p>
            <p>To reset your password, click the button below:</p>
            <div style="text-align: center;">
              <a href=${confirmationUrl} class="cta-button">Reset Password</a>
            </div>
            <p>Button not working? Copy and paste this link into your browser:</p>
            <p id="resetLinkText" style="word-break: break-all; color: #0066cc;">${confirmationUrl}</p>
            <div class="password-tips">
              <h2>Password Reset Tips:</h2>
              <ul>
                <li>Choose a strong, unique password</li>
                <li>Don't reuse passwords from other sites</li>
                <li>Consider using a password manager</li>
              </ul>
            </div>
            <p>This password reset link will expire in 1 hours for security reasons.</p>
            <div class="footer">
              <p>
                This is an automated message. Please do not reply to this email.<br>
                If you need assistance, contact our support team at <a href="mailto:kumarvishal823003@gmail.com" style="color: #0066cc;">support@devcord.vercel.app</a>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  })
}
