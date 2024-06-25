import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
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
import NewBuildButton from "./NewBuildButton"
import MyBuildsButton from "./MyBuildsButton"
import SignInButton from "../authentication/SignInButton"
import SignUpButton from "../authentication/SignUpButton"

const TopBar = ({ user }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const history = useHistory()

  const loggedInUserName = user ? user.userName || user.githubUserName : ""
  const avatarLetter = loggedInUserName[0]?.toUpperCase()

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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar id="top-bar-items" disableGutters>
          <div className="top-left-app-bar">
            <Link to="/">
              <Button
                id="how-to-use-button"
                key={"how-to-use-button"}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                How To Use
              </Button>
            </Link>
            <Link to="/project-list">
              <Button
                id="homepage-button"
                key={"homepage-button"}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <img src="https://i.imgur.com/bE8OYhz.png" id="logo" />
                Home
              </Button>
            </Link>
          </div>
          <Typography
            variant="h6"
            noWrap
            component="a"
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
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
               <MenuItem >
                  <Typography onClick={()=>{history.push("/")}} textAlign="center">
                    My Builds
                  </Typography>
                </MenuItem>
              {"list of menu choices"}
            </Menu> */}
          </Box>
          {!user ? (
            <Box id="unauthenticated-items" sx={{ flexGrow: 0 }}>
              <SignUpButton />
              <SignInButton />
              <GithubLogin />
            </Box>
          ) : (
            <Box id="authenticated-items" sx={{ flexGrow: 0 }}>
              <MyBuildsButton />
              <NewBuildButton />
              <SignOutButton shouldRedirect={shouldRedirect} signOut={signOut} />
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar >{avatarLetter}</Avatar>
                </IconButton>
              </Tooltip>
              {/* MENU FOR USER AVATAR */}
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
