import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { AuthProvider } from "@/components/AuthProvider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOVE | Premium Luxury Collection",
  description: "Experience liquid glass aesthetics and ultra-premium craftsmanship. Shop the NOVE classic collection.",
  metadataBase: new URL('https://www.thenove.in'),
  icons: {
    icon: [
      { url: 'https://www.thenove.in/nove-identity.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://www.thenove.in/favicon.ico' }
    ],
    apple: [
      { url: 'https://www.thenove.in/nove-identity.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  openGraph: {
    title: 'NOVE | Premium Luxury Collection',
    description: 'Experience liquid glass aesthetics and ultra-premium craftsmanship. Shop the NOVE classic collection.',
    url: 'https://www.thenove.in',
    siteName: 'NOVE',
    images: [
      {
        url: 'https://www.thenove.in/nove-brand-official.jpg',
        width: 1200,
        height: 630,
        alt: 'NOVE Luxury Collection',
        secureUrl: 'https://www.thenove.in/nove-brand-official.jpg',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOVE | Premium Luxury Collection',
    description: 'Experience liquid glass aesthetics and ultra-premium craftsmanship.',
    images: ['https://www.thenove.in/nove-brand-official.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-[#1d1d1f]/10 selection:text-black">
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
