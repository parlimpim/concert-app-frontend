import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.scss";

const karla = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reserve concert App",
  description: "You can reserve free concerts and enjoy them",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={karla.className}>{children}</body>
    </html>
  );
}
