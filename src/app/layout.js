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
  title: "IoSC-EDC",
  description:
    "The IoSC-EDC is the official Student Club at GGSIPU. We host tech events, hackathons, and workshops to foster innovation and help students become creators.",
  keywords: [
     "IoSC", "IoSC-EDC", "GGSIPU", "student club", "tech events",
    "hackathons", "workshops", "entrepreneurship", "innovation", "coding", "IPU club",
  ],
  openGraph: {
    title: "IoSC-EDC",
    description:
      "Join the top tech and entrepreneurship club at GGSIPU. Participate in hackathons, workshops, and speaker sessions to build your future. 🚀",
    url: "https://www.iosc-edc.club", 
    siteName: "IoSC-EDC",
    images: [
      {
        url: "./favicon.ico", 
        width: 1200,
        height: 630,
        alt: "The official logo and banner for IoSC-EDC at GGSIPU",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: './favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: './favicon.ico', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: './favicon.ico',
    apple: './favicon.ico',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "IOSC-EDC",
              url: "https://www.iosc-edc.club",
              logo: "./favicon.ico"
            }),
          }}
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}