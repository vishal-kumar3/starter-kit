"use client"
import { userEmailVerification } from "@/actions/verification.action"
import CardWrapper from "@/components/auth/CardWrapper"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import {BeatLoader} from "react-spinners"
import ErrorMessage from "@/components/auth/ErrorMessage"
import SuccessMessage from "@/components/auth/SuccessMessage"
import { sendEmailVerificationMail } from "@/lib/nodemailer"

const EmailVerificationForm = ({token}: {token: string | null}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  
  const tokenVerification = async () => {
    if(success || error) return

    if(!token) {
      return setError("Missing token!!")
    }
    
    const userVerification = await userEmailVerification(token)
    setError(userVerification.error || "")
    setSuccess(userVerification.success || "")
  }

  useEffect(() => {
    tokenVerification()
  })

  return (
    <Suspense>
      <CardWrapper
        title="Email Verification"
        description="Verify your email address to continue"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        disableSocialLogin={true}
      >
        <div className="flex flex-col w-ful justify-center items-center">
          {
            !error && !success && (
              <BeatLoader size={10} color={"#968"} />
            )
          }
          <ErrorMessage message={error} />
          <SuccessMessage message={success} />
        </div>
      </CardWrapper>
    </Suspense>
  )
}


export default EmailVerificationForm
