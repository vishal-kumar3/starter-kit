"use server"
import EmailVerificationForm from "@/components/form/auth/EmailVerificationForm"


const EmailVerificationPage = ({searchParams}: {searchParams: {token: string | null}}) => {
  
  const queryParams = searchParams?.token || null;
  
  return (
    <div className="w-full flex justify-center items-center">
      <EmailVerificationForm token={queryParams} />
    </div>
  )
}

export default EmailVerificationPage
