
// Website or comapany name
export const getWebname = () => {
  if (process.env.WEB_NAME) {
    return process.env.WEB_NAME;
  } else {
    throw new Error("WEB_NAME is not defined");
  }
}

// Host Values eg:- https://localhost:3000 or https://starter-kit.vercel.app
export const getAuthTrustHost = () => {
  if (process.env.AUTH_TRUST_HOST) {
    return process.env.AUTH_TRUST_HOST;
  } else {
    throw new Error("AUTH_TRUST_HOST is not defined");
  }
}

// OAuth Values
export const getAuthGithubClientId = () => {
  if (process.env.AUTH_GITHUB_CLIENT_ID) {
    return process.env.AUTH_GITHUB_CLIENT_ID;
  } else {
    throw new Error("AUTH_GITHUB_CLIENT_ID is not defined");
  }
}

export const getAuthGithubClientSecret = () => {
  if (process.env.AUTH_GITHUB_CLIENT_SECRET) {
    return process.env.AUTH_GITHUB_CLIENT_SECRET;
  } else {
    throw new Error("AUTH_GITHUB_CLIENT_SECRET is not defined");
  }
}

export const getGithubOAuthCallback = () => {
  if (!process.env.AUTH_GITHUB_CALLBACK) {
    throw new Error("AUTH_GITHUB_CALLBACK is not defined");
  } 
  return process.env.AUTH_GITHUB_CALLBACK;
}

export const getAuthGoogleClientId = () => {
  if (process.env.AUTH_GOOGLE_CLIENT_ID) {
    return process.env.AUTH_GOOGLE_CLIENT_ID;
  } else {
    throw new Error("AUTH_GOOGLE_CLIENT_ID is not defined");
  }
}
export const getAuthGoogleClientSecret = () => {
  if (process.env.AUTH_GOOGLE_CLIENT_SECRET) {
    return process.env.AUTH_GOOGLE_CLIENT_SECRET;
  } else {
    throw new Error("AUTH_GOOGLE_CLIENT_SECRET is not defined");
  }
}

export const getGoogleOAuthCallback = () => {
  if (!process.env.AUTH_GOOGLE_CALLBACK) {
    throw new Error("AUTH_GOOGLE_CALLBACK is not defined");
  } 
  return process.env.AUTH_GOOGLE_CALLBACK;
}


// Nodemailer Values
export const getNodemailerUser = () => {
  if (process.env.NODEMAILER_EMAIL) {
    return process.env.NODEMAILER_EMAIL;
  } else {
    throw new Error("NODEMAILER_EMAIL is not defined");
  }
}

export const getNodemailerPass = () => {
  if (process.env.NODEMAILER_EMAIL_PASS) {
    return process.env.NODEMAILER_EMAIL_PASS;
  } else {
    throw new Error("NODEMAILER_EMAIL_PASS is not defined");
  }
}


// get Payment Environment Variables
// export const getRazorpayKeyId = () => {
//   if (process.env.RAZORPAY_KEY_ID) {
//     return process.env.RAZORPAY_KEY_ID;
//   } else {
//     throw new Error("RAZORPAY_KEY_ID is not defined");
//   }
// }

// export const getRazorpayKeySecret = () => {
//   if (process.env.RAZORPAY_KEY_SECRET) {
//     return process.env.RAZORPAY_KEY_SECRET;
//   } else {
//     throw new Error("RAZORPAY_KEY_SECRET is not defined");
//   }
// }