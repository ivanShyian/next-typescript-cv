import {NextPage} from 'next'
import SharedSectionTitle from '@/components/Shared/SharedSectionTitle'
import ProjectsList from '@/components/Index/IndexProjects/ProjectList'

const projects = [
  {id: 0, name: 'Someee', image: ''},
  {id: 1, name: 'So', image: ''},
  {id: 2, name: 'Som', image: ''},
  {id: 3, name: 'Some', image: ''},
  {id: 4, name: 'Somee', image: ''}
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
