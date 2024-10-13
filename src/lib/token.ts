import { getVerificationTokenByEmail } from '@/data/verification-token';
import prisma from '@/prisma';
import  { v4 as uuidv4 } from 'uuid'

export const generateVerificationToken = async (email: string) => {

  const existingToken = await getVerificationTokenByEmail(email)
  if(existingToken) {
    const deleteToken = await prisma.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    }).catch(error => null)
  }

  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600*1000);

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  }).catch(error => null)

  if(!verificationToken){
    return { error: 'Error creating verification token' }
  }

  return {verificationToken}
}
