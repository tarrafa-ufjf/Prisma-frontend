import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Sidebar from "@/components/ui/sidebar";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Projeto Prisma",
  description: "Aplicação usando Next.js",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
