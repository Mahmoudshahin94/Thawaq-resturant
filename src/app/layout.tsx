import type { Metadata } from "next";
import { Poppins, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import SessionWrapper from "@/components/SessionWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "مطعم الذواق — Menu",
  description: "قائمة مطعم الذواق الرقمية — حمص، فول، فلافل، ساندويشات ووجبات.",
  keywords: ["مطعم الذواق", "Al-Thawaq", "menu", "digital menu"],
  openGraph: {
    title: "مطعم الذواق",
    description: "مطعم الذواق — بإدارة أبو كمال",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${poppins.variable} ${cairo.variable} antialiased bg-bg text-ink min-h-screen`}>
        <SessionWrapper>
          <ThemeProvider>
            <LanguageProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </LanguageProvider>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
