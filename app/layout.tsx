import "./components/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoundRise Application",
  description: "Zuccolo Giada's master thesis project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-sky text-gray-950 relative`}
      >
        {children}
      </body>
    </html>
  );
}
