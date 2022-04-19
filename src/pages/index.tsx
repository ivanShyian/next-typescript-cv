import type { NextPage } from 'next'
import Head from 'next/head'

import IndexCutaway from '@/components/Index/IndexCutaway'
import IndexAbout from '@/components/Index/IndexAbout'
import IndexExperience from '@/components/Index/IndexExperience'

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
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=Rubik:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Oswald:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Changa:wght@800&family=Amatic+SC:wght@400;700&family=Josefin+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <IndexCutaway />
      <IndexAbout />
      <IndexExperience />
    </>
  )
}

export default Home
