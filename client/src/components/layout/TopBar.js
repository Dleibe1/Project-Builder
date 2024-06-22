import React, { useState } from "react"
import { Link } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import AdbIcon from "@mui/icons-material/Adb"

import SignOutButton from "../authentication/SignOutButton"
import GithubLogin from "../authentication/GithubLogin"
import UsernameTile from "./UsernameTile"
import SignInButton from "../authentication/SignInButton"
import SignUpButton from "../authentication/SignUpButton"

const TopBar = ({ user }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
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
    location.href = "/project-list"
  }

  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link className="sign-in button authentication-button" to="/user-sessions/new">
        Sign In
      </Link>
    </li>,
    <li key="sign-up" className="sign-up">
      <Link to="/users/new" className="button authentication-button">
        Sign Up
      </Link>
    </li>,
    <li>
      <GithubLogin />
    </li>,
  ]

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton id="sign-out" />
    </li>,
    <li>
      <Link id="create-build" to="/create-new-build">
        <Button variant="contained">Create Build</Button>
      </Link>
    </li>,
    <li>
      <Link id="my-builds" key={"my-builds"} to="/my-builds">
        <Button variant="contained">My Builds</Button>
      </Link>
    </li>,
    <li>
      <UsernameTile user={user} />
    </li>,
  ]

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar id="top-bar-items" disableGutters>
          <Link to="/project-list">
            <img src="https://i.imgur.com/bE8OYhz.png" id="logo" />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          {!user ? (
            <Box id="unauthenticated-items" sx={{ flexGrow: 0 }}>
              <SignUpButton />
              <SignInButton />
              <GithubLogin />
            </Box>
          ) : (
            <Box id="authenticated-items" sx={{ flexGrow: 0 }}>
              <Link key={"my-builds"} to="/my-builds">
                <Button
                  id="my-builds-button"
                  key={"my-builds"}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  My Builds
                </Button>
              </Link>
              <SignOutButton shouldRedirect={shouldRedirect} signOut={signOut} />
              <Tooltip itle="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* THIS IS WHERE THE LETTER IN THE USER CIRCLE GOES */}
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg">
                    F
                  </Avatar>
                </IconButton>
              </Tooltip>
              {/* MENU FOR USER ICON */}
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
                <MenuItem key={"avatar-logout"} onClick={handleCloseUserMenu}>
                  <Typography onClick={signOut} textAlign="center">
                    {"Logout"}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default TopBar
