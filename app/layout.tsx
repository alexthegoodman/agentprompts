import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Agent Prompts",
  description: "Home to AI Agent and AGI command prompts.",
  generator: "Next.js",
  applicationName: "AI Agent Prompts",
  referrer: "origin-when-cross-origin",
  keywords: ["AI", "Prompts", "AGI", "Command", "AI Agent"],
  authors: [{ name: "Common", url: "https://madebycommon.com" }],
  creator: "Common",
  publisher: "Common",
  // formatDetection: {
  //   email: false,
  //   address: false,
  //   telephone: false,
  // },
  openGraph: {
    title: "AI Agent Prompts",
    description: "Home to AI Agent and AGI command prompts.",
    url: "https://aiagentprompts.com",
    siteName: "AI Agent Prompts",
    images: [
      {
        url: "https://aiagentprompts.com/facebook.jpg", // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Prompts",
    description: "Home to AI Agent and AGI command prompts.",
    // siteId: '1467726470533754880',
    creator: "@alexthegoodman",
    // creatorId: '1467726470533754880',
    images: ["https://aiagentprompts.com/x.jpg"], // Must be an absolute URL
  },
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
