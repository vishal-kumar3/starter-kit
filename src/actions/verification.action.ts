"use server"

import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import prisma from "@/prisma"


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
