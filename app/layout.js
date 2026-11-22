import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "./components/ui/header-01";
import { Footer } from "./components/footer";
import { ThemeProvider } from "next-themes";

// Editorial serif for luxury headers
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

// Modern, crisp sans-serif for high readability
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "ACHAL INTERNATIONAL PVT LTD | Engineering & Infrastructure Excellence",
  description:
    "Delivering precision solutions in civil engineering, automated parking, premium corporate catering, multimodal cargo logistics, and green EV infrastructure across India.",
  keywords: [
    "ACHAL International",
    "Civil Engineering India",
    "Smart Parking Solutions",
    "EV Infrastructure",
    "Multimodal Logistics",
    "Corporate Catering",
  ],
  icons: {
    icon: "/final-logo.png",
  },
  themeColor: "#070D18",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${playfair.variable} ${plusJakarta.variable} font-sans bg-[#FAF8F5] text-[#0E1A30] antialiased selection:bg-[#E5C07B] selection:text-[#070D18] min-h-screen flex flex-col justify-between`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}