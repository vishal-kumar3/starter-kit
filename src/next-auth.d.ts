import { Prisma, UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";



export type ExtendedUser = DefaultSession["user"] & {
  role?: UserRole
  username?: string
}


declare module "next-auth" {
  interface User extends Prisma.UserGetPayload<{}> { }

  interface Session {
    user: ExtendedUser;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser extends Prisma.UserGetPayload<{}> { }
}
