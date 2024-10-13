"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import SocialLogin from "./SocialLogin"
import { Button } from "../ui/button"

type CardWrapperProps = {
  title: string
  description: string
  children: React.ReactNode
  backButtonLabel: string
  backButtonHref: string
  backButtonDescription?: string
  disableSocialLogin?: boolean
}

const CardWrapper = ({
  title,
  description,
  children,
  backButtonDescription,
  backButtonLabel,
  backButtonHref,
  disableSocialLogin=false,
}: CardWrapperProps) => {
  return (
  <Card className="w-full">
    <CardHeader className="flex flex-col justify-center items-center">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
    {!disableSocialLogin && <SocialLogin />}
    <CardFooter className="mx-auto w-fit">
      {backButtonDescription}{" "}
      <Link href={backButtonHref}>
        {
          backButtonDescription ? 
          <div className="text-blue-500">{backButtonLabel}</div> :
          <Button variant={"ghost"}>{backButtonLabel}</Button>
        }
      </Link>
    </CardFooter>
  </Card>
  )
}

export default CardWrapper