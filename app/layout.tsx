import type { Metadata } from "next";
import { Geist, Geist_Mono,Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { ToastContainer } from "react-toastify";
import SessionWraper from "./components/SessionWrappers";
import BottomNav from "./components/BottomNavBar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sora = Sora({
  
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blimp",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.className} antialiased bg-black h-screen w-screen`}
      >
        
        
        <ToastContainer theme="dark"/>
        <SessionWraper>
        <Navbar/>
        {children}
        <BottomNav/>
        </SessionWraper>
        
        
      </body>
    </html>
  );
}
