import {NextPage} from 'next'
import {Html, Head, Main, NextScript} from 'next/document'

const Document: NextPage = () => {

  return (
    <Html>
      <Head>
        <meta name="description" content="Ivan Shyian Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
