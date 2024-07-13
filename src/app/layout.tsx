import Navbar from "@component/Navbar";
import SessionProviderWrapper from "@component/SessionProviderWrapper";
import "./globals.css";
import "../styles/prism.css";

export const metadata = {
  title: 'Next.js + Azure AD Authentication',
  description: 'App demonstrating Azure AD auth with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Navbar />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
