import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgentPrompts",
  description: "Home to AI Agent and AGI prompts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ViewTransitions>
  );
}
