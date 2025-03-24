import React, { useState } from "react"
import { Link } from "react-router-dom"
import SignUpButton from "./SignUpButton"
import SignInButton from "./SignInButton"
import GithubLoginButton from "./GithubLoginButton"
import { Box, IconButton, Typography, Menu, MenuItem } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

const NavBarRightUnAuthed = (props) => {
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const handleGithubLogin = () => {
    window.location.href = "/api/v1/github-user-sessions/login"
  }
  return (
    <>
      <SignUpButton />
      <SignInButton />
      <GithubLoginButton />
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex", lg: "none" } }}>
        <IconButton
          id="burger-menu"
          data-cy="burger-menu-button-unauthed"
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          data-cy="burger-menu-items-unauthed"
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
            display: { xs: "block", md: "block" },
          }}
        >
          <MenuItem
            sx={{ display: { xs: "flex", md: "none", lg: "none" } }}
            component={Link}
            to="/user-sessions/new"
          >
            <Typography className="burger-menu-item">Sign In</Typography>
          </MenuItem>
          <MenuItem
            sx={{ display: { xs: "flex", md: "none", lg: "none" } }}
            component={Link}
            to="/users/new"
          >
            <Typography className="burger-menu-item">Sign Up</Typography>
          </MenuItem>
          <MenuItem
            sx={{ display: { xs: "flex", md: "none", lg: "none" } }}
            onClick={handleGithubLogin}
          >
            <Typography textAlign="center">Login With GitHub</Typography>
          </MenuItem>
          <MenuItem
            sx={{ display: { xs: "flex", md: "flex", lg: "none" } }}
            component={Link}
            to="/how-to-use"
          >
            <Typography className="burger-menu-item">How to use</Typography>
          </MenuItem>
          <MenuItem
            sx={{ display: { xs: "flex", md: "flex", lg: "none" } }}
            component={Link}
            to="/about"
          >
            <Typography className="burger-menu-item">About</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  )
}

export default NavBarRightUnAuthed
