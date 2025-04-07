/* eslint-disable @next/next/no-css-tags */
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "boxicons/css/boxicons.min.css";
import Script from "next/script";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/theme/sneat-1.0.0/assets/css/demo.css" />
        {/* Core CSS */}
        <link rel="stylesheet" href="/theme/sneat-1.0.0/assets/vendor/css/core.css" />
        <link rel="stylesheet" href="/theme/sneat-1.0.0/assets/vendor/css/theme-default.css" />
        <link rel="stylesheet" href="/theme/sneat-1.0.0/assets/css/demo.css" />
        {/* Vendor CSS (if needed) */}
        <link rel="stylesheet" href="/theme/sneat-1.0.0/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
        <title>Course Files</title>
      </head>
      <body>

        <Toaster position="top-center" />
        {children}

        {/* theme related scripts */}
        <Script src="/theme/sneat-1.0.0/assets/js/config.js" strategy="beforeInteractive" />
        <Script src="/theme/sneat-1.0.0/assets/vendor/libs/jquery/jquery.js" strategy="beforeInteractive" />
        <Script src="/theme/sneat-1.0.0/assets/vendor/libs/popper/popper.js" strategy="beforeInteractive" />
        <Script src="/theme/sneat-1.0.0/assets/vendor/js/bootstrap.js" strategy="beforeInteractive" />
        <Script src="/theme/sneat-1.0.0/assets/vendor/js/helpers.js" strategy="beforeInteractive" />
        <Script src="/theme/sneat-1.0.0/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js" strategy="afterInteractive" />
        <Script src="/theme/sneat-1.0.0/assets/vendor/js/menu.js" strategy="afterInteractive" />
        <Script src="/theme/sneat-1.0.0/assets/js/main.js" strategy="afterInteractive" />
      </body>

    </html>
  );
}
