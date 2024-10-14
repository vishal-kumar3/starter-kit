"use server"

import { getUserByEmail } from "@/data/user"
import { getPasswordResetTokenByToken, getVerificationTokenByToken } from "@/data/verification-token"
import { sendPasswordResetEmail } from "@/lib/nodemailer"
import { generatePasswordResetToken } from "@/lib/token"
import prisma from "@/prisma"
import bcrypt from "bcryptjs"

export const userEmailVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)
  if (!existingToken) {
    return { error: "Invalid token" }
  }

  const hasExpired = existingToken.expires < new Date()
  if (hasExpired) {
    return { error: "Token has expired" }
  }

  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) {
    return { error: "Email not found" }
  }

  const verifiedUser = await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email // update email since we will use it for email change
    }
  }).catch(error => null)

  if(!verifiedUser) {
    return { error: "Error verifying email" }
  }

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    }
  }).catch(error => null)


  return { success: "Email verified successfully" }
}

export const sendPasswrodResetEmail = async (email: string) => {
  const user = await getUserByEmail(email)
  if (!user) {
    return { error: 'Email is not registered!' }
  }

  const { error, passwordResetToken } = await generatePasswordResetToken(email)
  if(error) return { error }

  await sendPasswordResetEmail(email, passwordResetToken?.token!)

  return { success: "Password reset email sent successfully" }
}

export const resetPassword = async (password: string, confirmPassword: string, token: string) => {
  if(!password || !confirmPassword || !token) return { error: "Invalid request" }
  if(password !== confirmPassword) return { error: "Passwords do not match" }

  const existingToken = await getPasswordResetTokenByToken(token)
  if(!existingToken) return { error: "Invalid token" }

  const hasExpired = existingToken.expires < new Date()
  if(hasExpired) return { error: "Token has expired" }

  const user = await getUserByEmail(existingToken.email)
  if(!user) return { error: "Email not found" }

  if(user.password){
    const isPasswordSame = await bcrypt.compare(password, user.password)
    console.log("isPasswordSame:- ", isPasswordSame)
    if(isPasswordSame) return { error: "Password cannot be same as previous one!!" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      emailVerified: user.emailVerified ? user.emailVerified : new Date(),
    }
  }).catch(error => null)

  if(!updatedUser) return { error: "Error updating user" }

  await prisma.passwordResetToken.delete({
    where: {
      id: existingToken.id
    }
  }).catch(error => null)

  return { success: "Password reset successfully" }
}
