import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="he" dir="rtl">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style jsx global>{`
          @tailwind base;
          @tailwind components;
          @tailwind utilities;
          
          body {
            font-family: 'Rubik', sans-serif;
            direction: rtl;
          }
        `}</style>
      </Head>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
