import NextAuth from "next-auth/next";
import NextAuthConf from "../../../lib/NextAuth";

const handler=NextAuth(NextAuthConf)

export const GET=handler
export const POST=handler