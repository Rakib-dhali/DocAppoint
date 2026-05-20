import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/lib/LenisProvider";

export const metadata: Metadata = {
  title: "DocAppoint",
  description: "DocAppoint",
  icons: {
    icon: "/logo1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body>
        <Navbar/>
        <LenisProvider>
        {children}</LenisProvider>
        <Footer/>
        </body>
    </html>
  );
}
