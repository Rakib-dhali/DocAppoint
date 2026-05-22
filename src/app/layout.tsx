import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/lib/LenisProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Cliniqo",
  description: "Cliniqo is a platform that connects doctors with patients.",
  icons: {
    icon: "/logo-c.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
        <LenisProvider>{children}</LenisProvider>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
