import React, { useState, useEffect } from "react"
import { TagProvider } from "../contexts/TagContext"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import "../assets/scss/main.scss"
import getCurrentUser from "../api/getCurrentUser"
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import UnauthenticatedRoute from "./authentication/UnAuthenticatedRoute"
import RegistrationForm from "./authentication/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import NavigationBar from "./navigation-bar/NavigationBar"
import ProjectList from "./project-list-pages/ProjectList"
import ForkList from "./project-list-pages/ForkList"
import SearchList from "./project-list-pages/SearchList"
import ProjectShow from "./show-pages/ProjectShow"
import MyBuildShow from "./show-pages/MyBuildShow"
import DiffView from "./show-pages/show-pages-shared/DiffView"
import NewProjectForm from "./project-forms/NewProjectForm"
import MyBuildList from "./project-list-pages/MyBuildsList"
import EditBuildForm from "./project-forms/EditBuildForm"
import ForkProjectForm from "./project-forms/ForkProjectForm"
import About from "./information-pages/About"
import NotFound404 from "./information-pages/404NotFound"
import FilterByTag from "./shared/FilterByTag"
import HowToUse from "./information-pages/HowToUse"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [projectsPerPage, setProjectsPerPage] = useState(9)

  useEffect(() => {
    getCurrentUser()
      .then((userInfo) => {
        setCurrentUser(userInfo)
      })
      .catch(() => {
        setCurrentUser(null)
      })
  }, [])

  return (
    <Router>
      <TagProvider>
        <NavigationBar projectsPerPage={projectsPerPage} user={currentUser} />
        <FilterByTag />
        <AuthenticatedRoute path="/my-builds/:id" component={MyBuildShow} user={currentUser} />
        <Route path="/projects/:id">
          <ProjectShow user={currentUser} />
        </Route>
        <Route exact path="/">
          <ProjectList projectsPerPage={projectsPerPage} user={currentUser} />
        </Route>
      </TagProvider>
      <Route exact path="/project-forks/:parentProjectId">
        <ForkList projectsPerPage={projectsPerPage} user={currentUser} />
      </Route>
      <Route exact path="/search">
        <SearchList projectsPerPage={projectsPerPage} user={currentUser} />
      </Route>
      <Route exact path="/diff-view/:parentProjectId/:forkedProjectId" component={DiffView} />
      <AuthenticatedRoute
        exact
        path="/my-builds-list"
        component={MyBuildList}
        projectsPerPage={projectsPerPage}
        user={currentUser}
      />
      <AuthenticatedRoute
        exact
        path="/create-new-build"
        component={NewProjectForm}
        user={currentUser}
      />
      <AuthenticatedRoute
        exact
        path="/edit-my-build/:id"
        component={EditBuildForm}
        user={currentUser}
      />
      <AuthenticatedRoute
        exact
        path="/fork-project/:id"
        component={ForkProjectForm}
        user={currentUser}
      />
      <UnauthenticatedRoute
        exact
        path="/users/new"
        component={RegistrationForm}
        user={currentUser}
      />
      <UnauthenticatedRoute
        exact
        path="/user-sessions/new"
        component={SignInForm}
        user={currentUser}
      />
      <Route path="/how-to-use" component={HowToUse} />
      <Route path="/about" component={About} />
      <Route exact path="/404" component={NotFound404} />
    </Router>
  )
}

export default hot(App)
