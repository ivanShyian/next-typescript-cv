import {NextPage} from 'next'
import {Html, Head, Main, NextScript} from 'next/document'

const Document: NextPage = () => {
  return (
    <Html lang="en">
      <Head>
        <title>ivanShyian</title>
        <meta name="description" content="Ivan Shyian Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Changa:wght@800&family=League+Spartan:wght@400;600;700&family=Rubik:wght@300;400;600;700&family=Oswald:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
