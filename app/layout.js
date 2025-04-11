/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-css-tags */
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "boxicons/css/boxicons.min.css";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="layout-navbar-fixed layout-menu-fixed"
      dir="ltr"
      data-skin="default"
      data-bs-theme="light"
      data-assets-path="/theme/sneat-1.0.0/assets/"
      data-template="vertical-menu-template-starter"
    >
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

        {/* Core CSS */}
        <link rel="stylesheet" href="/theme/sneat-1.0.0/assets/vendor/css/core.css" />
        <link rel="stylesheet" href="/theme/sneat-1.0.0/assets/vendor/css/theme-default.css" />
        <link rel="stylesheet" href="/theme/sneat-1.0.0/assets/css/demo.css" />
        {/* Vendor CSS (if needed) */}
        <link rel="stylesheet" href="/theme/sneat-1.0.0/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />

        {/* Helpers */}
        <Script src="/theme/sneat-1.0.0/assets/vendor/js/helpers.js" strategy="beforeInteractive" />

        {/* Config */}
        <Script src="/theme/sneat-1.0.0/assets/js/config.js" strategy="beforeInteractive" />

      </head>
      <body>
        <Toaster position="top-center" />
        {children}

        {/* Core JS */}
        <Script src="/theme/sneat-1.0.0/assets/vendor/libs/jquery/jquery.js" strategy="beforeInteractive" />
        <Script src="/theme/sneat-1.0.0/assets/vendor/libs/popper/popper.js" strategy="beforeInteractive" />
        <Script src="/theme/sneat-1.0.0/assets/vendor/js/bootstrap.js" strategy="beforeInteractive" />
        <Script src="/theme/sneat-1.0.0/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js" strategy="afterInteractive" />
        <Script src="/theme/sneat-1.0.0/assets/vendor/js/menu.js" strategy="afterInteractive" />

        {/* Main JS */}
        <Script src="/theme/sneat-1.0.0/assets/js/main.js" strategy="afterInteractive" />

      </body>
    </html>
  );
}
