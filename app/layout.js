import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sahil Gupta - Full Stack Developer | Portfolio",
  description: "Portfolio of Sahil Gupta, a passionate Full-Stack Developer and Final Year ECE student at MNIT Jaipur. Specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: "Sahil Gupta, Full Stack Developer, React, Next.js, Node.js, Portfolio, Web Developer, MNIT Jaipur",
  authors: [{ name: "Sahil Gupta" }],
  openGraph: {
    title: "Sahil Gupta - Full Stack Developer",
    description: "Portfolio showcasing my projects, skills, and experience in web development",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
