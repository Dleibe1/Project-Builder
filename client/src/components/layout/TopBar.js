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
    </li>
  ]

  return (
    <div className="menu">
      <div className="top-bar-left-container">
        <Link id="logo-container" to="/project-list">
          <img src="https://i.imgur.com/Y9merbS.png" className="logo" />
        </Link>
      </div>
      <Link id="how-to-use-icon" to="/">
        <img src="https://i.imgur.com/MO53L50.png" />
      </Link>
      <div className="top-bar-buttons-container">
        {user ? authenticatedListItems : unauthenticatedListItems}
      </div>
    </div>
  )
}

export default TopBar
