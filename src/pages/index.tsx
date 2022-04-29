import type { NextPage } from 'next'
import {Fragment} from 'react'

import Head from 'next/head'
import IndexCutaway from '@/components/Index/IndexCutaway'
import IndexAbout from '@/components/Index/IndexAbout'
import IndexEducation from '@/components/Index/IndexEducation'
import IndexWork from '@/components/Index/IndexWork'
import IndexProjects from '@/components/Index/IndexProjects'
import IndexContactMe from '@/components/Index/IndexContactMe'

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        {/*Lato, League Spartan, Libre Baskerville, Rubik, Oswald, Changa, Amatic SC, Josefin Sans*/}
        {/*@TODO Clear head*/}
        <title>ivanShyian</title>
        <meta name="description" content="Ivan Shyian Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=Rubik:wght@300;400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Oswald:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Changa:wght@800&family=Amatic+SC:wght@400;700&family=Josefin+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <IndexCutaway />
      <IndexAbout />
      <IndexEducation />
      <IndexWork />
      <IndexProjects />
      <IndexContactMe />
    </Fragment>
  )
}

export default Home
