import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectShowCase from './components/ProjectShowCase'
import './App.css'

// This is the list (static data) used in the application. You can move it to any component if needed.

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Replace your code here
class App extends Component {
  state = {
    searchInput: 'ALL',
    apiStatus: apiStatusConstants.initial,
    projectList: [],
  }

  componentDidMount() {
    this.getProjectData()
  }

  getProjectData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    console.log(searchInput)
    const url = `https://apis.ccbp.in/ps/projects?category=${searchInput}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()

    console.log(fetchedData)
    if (response.ok === true) {
      const updatedData = fetchedData.projects.map(eachProject => ({
        id: eachProject.id,
        imageUrl: eachProject.image_url,
        name: eachProject.name,
      }))
      this.setState({
        projectList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getProjectData)
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.getProjectData}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {projectList} = this.state
    return (
      <div className="project-con">
        <ul className="project-con-list">
          {projectList.map(eachProject => (
            <ProjectShowCase
              key={eachProject.id}
              projectDetails={eachProject}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderProjectsStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="app-container">
        <nav className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="web-logo"
          />
        </nav>
        <div>
          <select
            className="select-input"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          >
            {categoriesList.map(eachCategory => (
              <option key={eachCategory.id} value={eachCategory.id}>
                {eachCategory.displayText}
              </option>
            ))}
          </select>
          {this.renderProjectsStatus()}
        </div>
      </div>
    )
  }
}

export default App
