import {NextPage} from 'next'
import './IndexExperience.scss'

export const IndexExperience: NextPage = () => {
  return (
    <section className='index__experience experience'>
      <div className="experience__heading">Experience</div>
      <div className="experience__content">
        <div className="experience__card experience__degree">
          <ul className="experience__degree_list">
            <li className="experience__degree_item">KITZ</li>
            <li className="experience__degree_item">NAU</li>
          </ul>
        </div>
        <div className="experience__card experience__work">
          <ul className="experience__work_list">
            <li className="experience__work_item">INRATING</li>
            <li className="experience__work_item">FRESH DESIGN</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
