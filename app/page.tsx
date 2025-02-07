
import { MainPage } from "./components/MainPage";


import { getServerSession } from "next-auth";
import NextAuth from "./lib/NextAuth";

import { useRouter } from "next/router";


export default async function Home() {


  const data = await getServerSession(NextAuth)

  
  
  return (
    <>
      <MainPage/>
      
    </>
  );
}


