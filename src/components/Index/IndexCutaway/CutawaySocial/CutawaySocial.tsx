import './CutawaySocial.scss'
import FacebookIcon from '@/public/icons/social-icons/facebook.svg'
import TelegramIcon from '@/public/icons/social-icons/telegram.svg'
import LinkedinIcon from '@/public/icons/social-icons/linkedin.svg'
import InstagramIcon from '@/public/icons/social-icons/instagram.svg'
import GithubIcon from '@/public/icons/social-icons/github.svg'
import {FC} from 'react'

const IconMap: {
  [key: string]: any
} = {
  Telegram: <TelegramIcon />,
  Linkedin: <LinkedinIcon />,
  Instagram: <InstagramIcon />,
  Github: <GithubIcon />,
  Facebook: <FacebookIcon />
}

export const CutawaySocial: FC<{links: {[key: string]: string}}> = ({links}) => {
  const linksMap = () => {
    const resultArray = []

    for (const l in links) {
      const name = l as string
      const href = links[l]
      resultArray.push((
        <li className="cutaway-social__link" key={name}>
          <a href={href} rel="noreferrer" target="_blank">
            {IconMap[name]}
          </a>
        </li>
      ))
    }

    return resultArray
  }

  return (
    <div className="cutaway-social">
      <ul className="cutaway-social__list">
        {linksMap()}
      </ul>
    </div>
  )
}
