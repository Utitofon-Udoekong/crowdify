import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import {ThirdwebProvider} from '@/app/thirdweb'
import CryptoContextProvider from "@/app/context";
import "./globals.css";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crowdify",
  description: "Web3 Crowdfunding application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <ThirdwebProvider>
          <CryptoContextProvider>
            {children}
          </CryptoContextProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
