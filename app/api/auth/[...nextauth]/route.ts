// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { GET, POST } from "@/auth"

import NextAuth from "next-auth";
import  authConfig  from "@/auth.config";

const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export const GET = handlers.GET;
export const POST = handlers.POST;
export { auth, signIn, signOut };

// import { handlers } from "@/auth.config";
// export const { GET, POST } = handlers