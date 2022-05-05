import {NextPage} from 'next'
import './CutawaySocial.scss'
import FacebookIcon from '@/public/icons/social-icons/facebook.svg'
import TelegramIcon from '@/public/icons/social-icons/telegram.svg'
import LinkedinIcon from '@/public/icons/social-icons/linkedin.svg'
import InstagramIcon from '@/public/icons/social-icons/instagram.svg'
import GithubIcon from '@/public/icons/social-icons/github.svg'

export const CutawaySocial: NextPage = () => {
  return (
    <div className="cutaway-social">
      <ul className="cutaway-social__list">
        <li className="cutaway-social__link">
          <a href="https://www.facebook.com" rel="noreferrer" target="_blank">
            <FacebookIcon />
          </a>
        </li>
        <li className="cutaway-social__link">
          <a href="https://t.me/vanjke" rel="noreferrer" target="_blank">
            <TelegramIcon />
          </a>
        </li>
        <li className="cutaway-social__link">
          <a href="https://www.linkedin.com/in/ivan-shyian" rel="noreferrer" target="_blank">
            <LinkedinIcon />
          </a>
        </li>
        <li className="cutaway-social__link">
          <a href="https://www.instagram.com/vanjkes" rel="noreferrer" target="_blank">
            <InstagramIcon />
          </a>
        </li>
        <li className="cutaway-social__link">
          <a href="https://github.com/ivanShyian" rel="noreferrer" target="_blank">
            <GithubIcon />
          </a>
        </li>
      </ul>
    </div>
  )
}
