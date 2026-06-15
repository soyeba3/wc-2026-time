import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Cup 2026 Time | BD Time Schedule",
  description: "FIFA World Cup 2026 match schedule in Bangladesh Time (BST). Live hero, groups, full schedule, and knockout rounds.",
  keywords: "World Cup 2026, FIFA World Cup, BD Time, Bangladesh Time, Football Schedule, WC 2026",
  openGraph: {
    title: "World Cup 2026 Time | BD Time Schedule",
    description: "All World Cup 2026 matches in Bangladesh Time (BST).",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
