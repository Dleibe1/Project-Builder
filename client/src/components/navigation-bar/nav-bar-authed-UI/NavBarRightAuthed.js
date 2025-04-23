import React, { useState } from "react"
import { Link } from "react-router-dom"
import MyBuildsButton from "./MyBuildsButton"
import CreateBuildButton from "./CreateBuildButton"
import SignOutButton from "./SignOutButton"
import { Box, IconButton, Typography, Menu, Avatar, Tooltip, MenuItem } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import signOutUser from "../../../api/signOutUser"

const NavBarRightAuthed = ({ user }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const loggedInUserName = user ? user.userName || user.githubUserName : ""
  const avatarLetter = loggedInUserName[0]?.toUpperCase()
  const avatarImageURL = user?.githubAvatarURL
  const avatarWithImage = [
    <Avatar key="github-avatar" alt={loggedInUserName} src={avatarImageURL} />,
  ]
  const avatarJustALetter = [
    <Avatar key="letter-avatar" alt={loggedInUserName}>
      {avatarLetter}
    </Avatar>,
  ]

  const signOut = (event) => {
    event.preventDefault()
    signOutUser()
      .then(() => {
        return setShouldRedirect(true)
      })
      .catch((error) => {
        console.error("Sign out failed: ", error)
      })
  }

  if (shouldRedirect) {
    location.href = "/?page=1"
  }
  return (
    <>
      <MyBuildsButton />
      <CreateBuildButton />
      <SignOutButton signOut={signOut} />
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex", lg: "none" } }}>
        <IconButton
          id="burger-menu"
          data-cy="burger-menu-button-authed"
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          data-cy="burger-menu-items-authed"
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
          <MenuItem
            sx={{ display: { xs: "flex", md: "none" } }}
            component={Link}
            onClick={handleCloseNavMenu}
            to="/my-builds-list?page=1"
          >
            <Typography className="burger-menu-item">My Builds</Typography>
          </MenuItem>
          <MenuItem
            onClick={handleCloseNavMenu}
            sx={{ display: { xs: "flex", md: "flex", lg: "none" } }}
            component={Link}
            to="/how-to-use"
          >
            <Typography className="burger-menu-item">How to use</Typography>
          </MenuItem>
          <MenuItem
            onClick={handleCloseNavMenu}
            sx={{ display: { xs: "flex", md: "flex", lg: "none" } }}
            component={Link}
            to="/about"
          >
            <Typography className="burger-menu-item">About</Typography>
          </MenuItem>
          <MenuItem
            onClick={handleCloseNavMenu}
            sx={{ display: { xs: "flex", md: "none" } }}
            component={Link}
            to="/create-new-build"
          >
            <Typography className="burger-menu-item">Create Build</Typography>
          </MenuItem>
          <MenuItem sx={{ display: { xs: "flex", md: "none" } }} onClick={signOut}>
            <Typography textAlign="center">Sign Out</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <Tooltip data-cy="avatar-button">
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
        <MenuItem onClick={signOut}>
          <Typography textAlign="center">Sign Out</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default NavBarRightAuthed
