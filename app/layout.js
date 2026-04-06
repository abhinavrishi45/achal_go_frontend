import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/ui/header-01";
import { Footer } from "./components/footer";
// import PageLoader from "./components/ui/page-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ACHAL PROJECTS PVT LTD",
  description: "Premium services in civil engineering, parking, restaurant, cargo, and EV charging across India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
