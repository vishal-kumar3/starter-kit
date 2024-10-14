"use server"

import ForgetPassword from "@/components/form/auth/ForgetPassword";



const ForgotPasswordPage = ({ searchParams }: { searchParams: { token: string | null } }) => {
  console.log("searchParam:- ", searchParams)
  const queryParams = searchParams?.token || null;
  console.log("queryParams:- ", queryParams)
  
  return (
    <ForgetPassword token={queryParams} />
  )
};

export default ForgotPasswordPage;
