import type { Metadata } from "next";
import "./globals.css";

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
        {children}
        </body>
    </html>
  );
}
