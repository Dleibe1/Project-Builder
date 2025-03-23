import React, { useContext } from "react"
import { TagContext } from "../../contexts/TagContext"
import { Link } from "react-router-dom"
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
} from "@mui/material"
import NavBarSearch from "./NavBarSearch"
import NavBarRightAuthed from "./nav-bar-authed-UI/NavBarRightAuthed"
import NavBarRightUnAuthed from "./nav-bar-unauthed-UI/NavBarRightUnauthed"

const NavigationBar = ({ user, projectsPerPage }) => {
  const { selectedTag, setSelectedTag } = useContext(TagContext)

  const handleProjectsLinkClick = () => {
    setSelectedTag("")
  }

  return (
    <AppBar id="app-bar" position="fixed">
      <Container maxWidth="xl">
        <Toolbar id="nav-bar-items" disableGutters>
          <div className="top-left-nav-bar">
            <Button
              component={Link}
              to="/how-to-use"
              id="how-to-use-button"
              sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
            >
              How To Use
            </Button>
            <Button
              sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
              component={Link}
              onClick={handleProjectsLinkClick}
              to="/about"
              id="projects-button"
            >
              About
            </Button>
            <Button
              component={Link}
              onClick={handleProjectsLinkClick}
              to="/?page=1"
              id="homepage-button"
              sx={{ display: "block" }}
            >
              <img src="/images/project-builder-logo.png" id="logo" />
              Home
            </Button>
          </div>
          <Box id="top-right-nav-bar" sx={{ flexGrow: 0 }}>
            <NavBarSearch projectsPerPage={projectsPerPage} />
            {user ? <NavBarRightAuthed user={user} /> : <NavBarRightUnAuthed />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavigationBar
