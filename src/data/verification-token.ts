import prisma from "@/prisma"


export const getVerificationTokenByEmail = async (
  email: string
) => {

  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      email
    }
  }).catch(error => null)

  return verificationToken

}

export const getVerificationTokenByToken = async (
  token: string
) => {

  const verificationToken = await prisma.verificationToken.findUnique({
    where: {
      token
    }
  }).catch(error => null)

  return verificationToken

}

export const getPasswordResetTokenByEmail = async (email: string) => {

  const passwordResetToken = await prisma.passwordResetToken.findFirst({
    where: {
      email
    }
  }).catch(error => null)

  return passwordResetToken
}

export const getPasswordResetTokenByToken = async (token: string) => {

  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token
    }
  }).catch(error => null)

  return passwordResetToken
}