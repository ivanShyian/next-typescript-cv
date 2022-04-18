import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        {/*@TODO Clear head*/}
        <title>ivanShyian</title>
        <meta name="description" content="Ivan Shyian Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css"
              integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7"
              crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=Rubik:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Oswald:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Changa:wght@800&family=Amatic+SC:wght@400;700&family=Josefin+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div>Hello im not a sidebar</div>
    </>
  )
}

export default Home
