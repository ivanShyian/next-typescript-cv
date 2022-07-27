interface ISeo {
  meta: ISeoMeta
  social: ISeoSocial
}

interface ISeoMeta {
  title: string
  description: string
  rootUrl: string
  social: {
    [key: string]: string
  }
}

type ISeoSocial = (params: {openGraphType?: string, url?: string, title?: string, description?: string, image?: string, createdAt?: string, updatedAt?: string}) => {[key: string]: any}[]

const seo: ISeo = {
  meta: {
    rootUrl: 'https://vanjkes.tech',
    title: 'ivanShyian',
    description: 'Ivan Shyian portfolio site',
    social: {
      graphic: 'https://imgur.com/pHjeOLG',
      twitter: '@vanjkes'
    }
  },
  social: function({openGraphType, url, title, description, image, createdAt, updatedAt}) {
    return [
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:site',
        content: this.meta.social.twitter
      },
      {
        name: 'twitter:title',
        content: title
      },
      {
        name: 'twitter:description',
        content: description
      },
      {
        name: 'twitter:creator',
        content: this.meta.social.twitter
      },
      {
        name: 'twitter:image:src',
        content: image
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'og:title',
        content: title
      },
      {
        name: 'og:type',
        content: openGraphType
      },
      {
        name: 'og:url',
        content: url
      },
      {
        name: 'og:image',
        content: image
      },
      {
        name: 'og:description',
        content: description
      },
      {
        name: 'og:site_name',
        content: this.meta.title
      },
      {
        name: 'og:published_time',
        content: createdAt || new Date().toISOString()
      },
      {
        name: 'og:modified_time',
        content: updatedAt || new Date().toISOString()
      }
    ]
  }
}

export default seo
