import Navbar from "@component/Navbar";
import SessionProviderWrapper from "@component/SessionProviderWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import "../styles/prism.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { NextUIProvider } from "@nextui-org/react";
config.autoAddCss = false;

export const metadata = {
  title: "Next.js + Azure AD Authentication",
  description: "App demonstrating Azure AD auth with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body>
        <NextUIProvider>
          <SessionProviderWrapper>
            <Navbar />
            <main className="container mx-auto p-4">{children}</main>
          </SessionProviderWrapper>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </NextUIProvider>
      </body>
    </html>
  );
}
