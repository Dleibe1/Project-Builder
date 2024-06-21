import React from "react"
import { Link, useLocation } from "react-router-dom"

import SignOutButton from "../authentication/SignOutButton"
import GithubLogin from "../authentication/GithubLogin"
import UsernameTile from "./UsernameTile"
import Button from "@mui/material/Button"

const TopBar = ({ user }) => {
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
  ]

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ]

  let newBuildButton = [
      
        <Button variant="contained">Create Build
        <Link id="create-build" to="/create-new-build" />
        </Button>
  ]
  const { pathname } = useLocation()
  let myBuildsButton = [
    <Button variant="contained">
      My Builds
      <Link id="my-builds" key={"my-builds"} to="/my-builds" />
    </Button>,
  ]

  return (
    <div className="menu">
      <div className="top-bar-left-container">
        <Link id="logo-container" to="/project-list">
          <img src="https://i.imgur.com/Y9merbS.png" className="logo" />
        </Link>
        {user ? <UsernameTile user={user} /> : []}
      </div>
      <Link id="how-to-use-icon" to="/">
        <img src="https://i.imgur.com/MO53L50.png" />
      </Link>
      <div className="top-bar-buttons-container">
        <div className="user-build-buttons">
          {user && pathname !== "/create-new-build" ? newBuildButton : []}
          {user && pathname !== "/my-builds" ? myBuildsButton : []}
        </div>
        <div className="sign-in-sign-out">
          {user ? authenticatedListItems : unauthenticatedListItems}
        </div>
        {user?.loginMethod === "github" ? [] : <GithubLogin />}
      </div>
    </div>
  )
}

export default TopBar
