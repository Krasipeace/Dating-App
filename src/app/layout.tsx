import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import TopNav from "@/components/navbar/TopNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HeartBound",
  description: "Dating app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopNav />
          <main className="container mx-auto p-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
