import {NextPage} from 'next'
import './IndexProjects.scss'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import ProjectsList from '@/components/Index/IndexProjects/ProjectList'

const projects = [
  {id: 0, name: 'Someee', subtitle: 'Subtitle here is sss', image: ''},
  {id: 1, name: 'So', subtitle: 'Subtitle here is sss', image: ''},
  {id: 2, name: 'Som', subtitle: 'Subtitle here is sss', image: ''},
  {id: 3, name: 'Some', subtitle: 'Subtitle here is sss', image: ''},
  {id: 4, name: 'Somee', subtitle: 'Subtitle here is sss', image: ''}
]

export const IndexProjects: NextPage = () => {
  return (
    <div className="index__projects section projects">
      <div className="projects__wrapper container">
        <SharedSectionTitle>Projects</SharedSectionTitle>
        <div className="projects__content">
          <ProjectsList projects={projects} />
        </div>
      </div>
    </div>
  )
}
