import {
  ProjectListItem,
  ProjectItemImg,
  ProjectItemName,
} from './styledComponents'

const ProjectShowCase = props => {
  const {projectDetails} = props
  const {imageUrl, name} = projectDetails
  return (
    <ProjectListItem>
      <ProjectItemImg src={imageUrl} alt={name} />
      <ProjectItemName>{name}</ProjectItemName>
    </ProjectListItem>
  )
}
export default ProjectShowCase
