// "use client"
import React from "react";
import { signIn} from 'next-auth/react'
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const SocialLogin = () => {
  const googleAuth = async () => {
    signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT });
  };

  const githubAuth = async () => {
    signIn("github", { redirectTo: DEFAULT_LOGIN_REDIRECT });
  }

  return (
    <CardFooter className="flex flex-col gap-2">
      <div className="flex gap-2 w-full">
        <Button
          onClick={() => googleAuth()}
          className="w-full"
          variant={"outline"}
          size={"lg"}
        >
          <FcGoogle />
        </Button>
        <Button
          onClick={() => githubAuth()}
          className="w-full"
          variant={"outline"}
          size={"lg"}
        >
          <GitHubLogoIcon />
        </Button>
      </div>
    </CardFooter>
  );
};

export default SocialLogin;
