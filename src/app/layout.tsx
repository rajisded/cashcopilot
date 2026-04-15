import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omni Core | Market Intelligence",
  description: "Board-ready analysis in 4 minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
