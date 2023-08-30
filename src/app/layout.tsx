import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeToggle } from "@/components/ThemeToggle";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sebastian Pavel",
  description: "Sebastian Pavel portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"overflow-x-hidden"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <div className="fixed bottom-2 right-2">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
