"use client"
import { resetPassword } from "@/actions/verification.action";
import CardWrapper from "@/components/auth/CardWrapper";
import ErrorMessage from "@/components/auth/ErrorMessage";
import SuccessMessage from "@/components/auth/SuccessMessage";
import { CustomFormTitleMessage } from "@/components/form/CustomFormMessage";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordResetFormSchema } from "@/schema/verification.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const ForgetPassword = ({token}: {token: string | null}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const form = useForm<z.infer<typeof passwordResetFormSchema>>({
    resolver: zodResolver(passwordResetFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  })

  const onSubmit = async (data: z.infer<typeof passwordResetFormSchema>) => {
    if(!token) return setError("Missing token!!")
    setError("");
    setSuccess("");
    setLoadingButton(true)

    const { error, success } = await resetPassword(data.password, data.confirmPassword, token);
    setLoadingButton(true)
    if(error) setLoadingButton(false)
    setError(error || "");
    setSuccess(success || "");
  };

  return (
    <CardWrapper
      title="Forgot Password"
      description="Enter your email address and we will send you a link to reset your password."
      backButtonDescription=" "
      backButtonLabel="Back to Login Page"
      backButtonHref="/auth/login"
      disableSocialLogin={true}
    >
      {
        token ?
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <CustomFormTitleMessage title="New Password" />
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password..."
                      disabled={form.formState.isSubmitting || loadingButton}
                      {...field}
                    />
                  </FormControl>
                  
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <CustomFormTitleMessage title="Confirm Password" />
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter confirm password..."
                      disabled={form.formState.isSubmitting || loadingButton}
                      {...field}
                    />
                  </FormControl>
                  
                </FormItem>
              )}
            />
            <ErrorMessage message={error} />
            <SuccessMessage message={success} />
            <Button
              className="w-full bg-black text-white font-semibold dark:disabled:bg-black/50 disabled:bg-gray-300 disabled:cursor-not-allowed"
              type="submit"
              disabled={form.formState.isSubmitting || loadingButton}
            >
              Reset Password
            </Button>
          </form>
        </Form>
        :
        <ErrorMessage message="Invalid token" />
      }
    </CardWrapper>
  );
}

export default ForgetPassword;