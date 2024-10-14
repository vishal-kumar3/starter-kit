"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import SocialLogin from "@/components/auth/SocialLogin";
import ErrorMessage from "@/components/auth/ErrorMessage";
import SuccessMessage from "@/components/auth/SuccessMessage";
import { useState } from "react";
import { login } from "@/actions/auth.action";
import CardWrapper from "@/components/auth/CardWrapper";
import { loginFormSchema } from "@/schema/auth.schema";
import { CustomFormMessage, CustomFormTitleMessage } from "../CustomFormMessage";

type props = {};

const LoginForm = (props: props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    setError("");
    setSuccess("");

    const res = await login(data);
    setLoadingButton(true)
    if(res?.error) setLoadingButton(false)
    setError(res?.error || "");
    setSuccess(res?.success || "");
  };

  return (
    <CardWrapper
      title="Login"
      description="Welcome Back!!"
      backButtonDescription="Don&apos;t have an Account?"
      backButtonLabel="Sign Up"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <CustomFormTitleMessage title="Email" />
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Your Email..."
                      disabled={form.formState.isSubmitting || loadingButton}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <CustomFormTitleMessage title="Password" />
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Your Password..."
                      disabled={form.formState.isSubmitting || loadingButton}
                      {...field}
                    />
                  </FormControl>
                  
                </FormItem>
              )}
            />
            <div>
              <div className="py-1">
                <ErrorMessage message={error} />
                <SuccessMessage message={success} />
              </div>
              <Button
                size="sm"
                variant="link"
                asChild
                className="p-0 font-normal"
              >
                <Link href="/auth/reset-password">Forgot Password?</Link>
              </Button>
              <Button
                className="w-full bg-black text-white font-semibold dark:disabled:bg-black/50 disabled:bg-gray-300 disabled:cursor-not-allowed"
                type="submit"
                disabled={form.formState.isSubmitting || loadingButton}
              >
                Login
              </Button>
            </div>
          </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
