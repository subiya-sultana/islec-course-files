/* eslint-disable @next/next/no-page-custom-font */
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "boxicons/css/boxicons.min.css";
import { UserProvider } from "./context/UserContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Course Files</title>

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <UserProvider>
          <Toaster position="top-center" />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
