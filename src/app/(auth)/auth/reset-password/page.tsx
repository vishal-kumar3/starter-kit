"use client"
import CardWrapper from "@/components/auth/CardWrapper";
import { resetPasswordEmailFormSchema } from "@/schema/verification.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/auth/ErrorMessage";
import SuccessMessage from "@/components/auth/SuccessMessage";
import { Button } from "@/components/ui/button";
import { sendPasswrodResetEmail } from "@/actions/verification.action";
import { CustomFormTitleMessage } from "@/components/form/CustomFormMessage";

type props = {};

const ResetPasswordPage = (props: props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const form = useForm<z.infer<typeof resetPasswordEmailFormSchema>>({
    resolver: zodResolver(resetPasswordEmailFormSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordEmailFormSchema>) => {
    setError("");
    setSuccess("");
    setLoadingButton(true)

    // generate password reset token
    const {error, success } = await sendPasswrodResetEmail(data.email);

    if(error) setLoadingButton(false)
    setError(error || "");
    setSuccess(success || "");
  };

  return (
    <CardWrapper
      title="Reset Password"
      description="Enter your email address and we will send you a link to reset your password."
      backButtonDescription=" "
      backButtonLabel="Back to Login Page"
      backButtonHref="/auth/login"
      disableSocialLogin={true}
    >
      <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <CustomFormTitleMessage title="Email" />
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email..."
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
    </CardWrapper>
  );
};

export default ResetPasswordPage;
