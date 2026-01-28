import type { Metadata } from "next";
import ReduxProvider from "@/store/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Catalog",
  description: "Search and manage your book collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
