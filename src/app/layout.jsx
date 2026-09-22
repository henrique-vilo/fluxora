import { Geist, Geist_Mono } from "next/font/google";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";
import Footer from "@/components/shadcn-space/blocks/footer-02/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fluxora",
  description: "Sistema para Controle de Estoque",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans", 
})

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
