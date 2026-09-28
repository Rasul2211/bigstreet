import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Oswald, UnifrakturMaguntia } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import { QuickViewProvider } from "@/components/QuickView";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import "./globals.css";

const display = Oswald({ subsets: ["latin", "cyrillic"], weight: ["500", "600", "700"], variable: "--font-display-face" });
const inter = Inter_Tight({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono-face" });
const gothic = UnifrakturMaguntia({ weight: "400", subsets: ["latin"], variable: "--font-gothic-face" });

export const metadata: Metadata = {
  title: "BIGSTREET — Streetwear & Sneakers, Душанбе",
  description: "BIGSTREET — стритвир и кроссовки в Душанбе. ТЦ «Аниса», 3 этаж. Без выходных, 10:00–20:30.",
  icons: { icon: "/brand/bs-logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${inter.variable} ${mono.variable} ${gothic.variable}`}>
      <body>
        <CartProvider>
          <QuickViewProvider>
            <AnimatedBackground />
            <Header />
            <main className="site-main">{children}</main>
            <Footer />
            <CartDrawer />
          </QuickViewProvider>
        </CartProvider>
      </body>
    </html>
  );
}
