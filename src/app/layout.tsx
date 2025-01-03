import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import AppLayout from "@/components/app-layout";
import ClerkProvider from "@/components/clerk-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OrkoAI",
  description: "Effortlessly track your meals, monitor macros, and get personalized AI insights to optimize your diet and reach your goals faster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            showSpinner={false}
            color="hsl(var(--ring))"
            zIndex={9999}
          />
          <Toaster />
          <ClerkProvider>
            <AppLayout>{children}</AppLayout>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
