import React, {FC} from 'react'
import Head from 'next/head'
import seo from '@/utils/seo'

interface SeoProps {
  title?: string
  description?: string
  image?: string
  url?: string
  openGraphType?: string
}

const TheSeo: FC<SeoProps> = (props: SeoProps) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta itemProp="name" content={props.title} />
      <meta itemProp="image" content={props.image} />
      <meta itemProp="description" content={props.description} />
      <meta name="description" content={props.description} />
      {seo.social(props).map(({name, content}) => (
        <meta key={name} name={name} content={content}/>
      ))}

      {/*not a seo*/}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Head>
  )
}

TheSeo.defaultProps = {
  title: seo.meta.title,
  description: seo.meta.description,
  image: seo.meta.social.graphic,
  openGraphType: 'website'
}


export default TheSeo
