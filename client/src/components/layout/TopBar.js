import React, { useState, useContext } from "react"
import { TagContext } from "../../contexts/TagContext"
import { Link } from "react-router-dom"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import SignOutButton from "../authentication/SignOutButton"
import GithubLogin from "../authentication/GithubLogin"
import NewBuildButton from "./NewBuildButton"
import MyBuildsButton from "./MyBuildsButton"
import SignInButton from "../authentication/SignInButton"
import SignUpButton from "../authentication/SignUpButton"
import TopBarSearch from "./TopBarSearch"

const TopBar = ({ user, projectsPerPage }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const { selectedTag, setSelectedTag } = useContext(TagContext)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  //TODO: Create a context for URL search params?
  const handleProjectsLinkClick = () => {
    setSelectedTag("")
  }

  const signOut = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch("/api/v1/user-sessions", {
        method: "delete",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const respBody = await response.json()
      setShouldRedirect(true)
      return { status: "ok" }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  if (shouldRedirect) {
    location.href = "/?page=1"
  }

  const handleGithubLogin = () => {
    window.location.href = "/api/v1/github-user-sessions/login"
  }

  const loggedInUserName = user ? user.userName || user.githubUserName : ""
  const avatarLetter = loggedInUserName[0]?.toUpperCase()
  const avatarImageURL = user?.githubAvatarURL
  const avatarWithImage = [<Avatar alt={loggedInUserName} src={avatarImageURL} />]
  const avatarJustALetter = [<Avatar alt={loggedInUserName}>{avatarLetter}</Avatar>]

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar id="top-bar-items" disableGutters>
          <div className="top-left-app-bar">
            <Button
              component={Link}
              to="/how-to-use"
              id="how-to-use-button"
              key={"how-to-use-button"}
              sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
            >
              How To Use
            </Button>
            <Button
              component={Link}
              onClick={handleProjectsLinkClick}
              to="/about"
              id="projects-button"
              key={"projects-button"}
            >
              About
            </Button>
            <Button
              component={Link}
              onClick={() => setSelectedTag("")}
              to="/?page=1"
              id="homepage-button"
              key={"homepage-button"}
              sx={{ display: "block" }}
            >
              <img src="/images/project-builder-logo.png" id="logo" />
              Home
            </Button>
          </div>
          {user ? (
            <Box id="authenticated-items" sx={{ flexGrow: 0 }}>
              <TopBarSearch projectsPerPage={projectsPerPage} />
              <MyBuildsButton />
              <NewBuildButton />
              <SignOutButton shouldRedirect={shouldRedirect} signOut={signOut} />
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex", lg: "none" } }}>
                <IconButton
                  id="burger-menu"
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "flex", lg: "none" },
                  }}
                >
                  <MenuItem sx={{ display: { xs: "flex", md: "none" } }} component={Link} to="/">
                    <Typography className="burger-menu-item">How to use</Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{ display: { xs: "flex", md: "none" } }}
                    component={Link}
                    to="/my-builds-list?page=1"
                  >
                    <Typography className="burger-menu-item">My Builds</Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{ display: { xs: "flex", md: "flex" } }}
                    component={Link}
                    to="/create-new-build"
                  >
                    <Typography className="burger-menu-item">Create Build</Typography>
                  </MenuItem>
                  <MenuItem
                    sx={{ display: { xs: "flex", md: "flex" } }}
                    key={"burger-menu-logout"}
                    onClick={signOut}
                  >
                    <Typography textAlign="center">Sign Out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user?.githubAvatarURL ? avatarWithImage : avatarJustALetter}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={"avatar-logout"} onClick={signOut}>
                  <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box id="unauthenticated-items" sx={{ flexGrow: 0 }}>
              <TopBarSearch projectsPerPage={projectsPerPage} />
              <SignUpButton />
              <SignInButton />
              <GithubLogin />
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  id="burger-menu"
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem component={Link} to="/user-sessions/new">
                    <Typography className="burger-menu-item">Sign In</Typography>
                  </MenuItem>
                  <MenuItem component={Link} to="/users/new">
                    <Typography className="burger-menu-item">Sign Up</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleGithubLogin}>
                    <Typography textAlign="center">Login With GitHub</Typography>
                  </MenuItem>
                  <MenuItem component={Link} to="/">
                    <Typography className="burger-menu-item">How to use</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TopBar
