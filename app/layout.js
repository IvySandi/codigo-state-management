import "./globals.css";

export const metadata = {
  title: "Team Manager",
  description: "Build basketball teams and manage players.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full" suppressHydrationWarning>{children}</body>
    </html>
  );
}
