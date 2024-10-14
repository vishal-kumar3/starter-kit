import React from "react";
import { FormLabel, FormMessage } from "@/components/ui/form";

type CustomFormTitleMessageProps = {
  title: string;
};

export const CustomFormTitleMessage = ({ title }: CustomFormTitleMessageProps) => {
  return (
    <div className="flex gap-2 items-center p-0">
      <FormLabel>{title}</FormLabel>
      <FormMessage />
    </div>
  )
}

export const CustomFormMessage = () => {
  return (
    <FormMessage />
  )
}
