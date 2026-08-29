import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import localFont from "next/font/local";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const handwriting = localFont({
  src: "../public/fonts/Handwritingv1-Regular.woff2",
  variable: "--font-handwriting-custom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Justin Yuen | Audio & Software Engineer",
  description: "Audio & Software Engineer",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${ibmPlexSans.variable} ${handwriting.variable} antialiased flex flex-col min-h-screen`}>
        <Nav />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}