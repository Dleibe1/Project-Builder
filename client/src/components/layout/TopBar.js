import React from "react"
import { Link, useLocation } from "react-router-dom"

import SignOutButton from "../authentication/SignOutButton"
import GithubLogin from "../authentication/GithubLogin"
import UsernameTile from "./UsernameTile"

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
    <div>
      <Link
        key={"new-build-button"}
        id="new-build-button"
        className="part-button"
        to="/create-new-build"
      >
        + New Build
      </Link>
    </div>,
  ]
  const { pathname } = useLocation()
  let myBuildsButton = [
    <div>
      <Link key={"my-builds"} id="my-builds" className="part-button " to="/my-builds">
        My Builds
      </Link>
    </div>,
  ]

  return (
    <div className="menu">
      <div className="top-bar-left-container">
        <Link id="logo-container" to="/project-list">
          <img src="https://i.imgur.com/Y9merbS.png" className="logo" />
        </Link>
        {user ? <UsernameTile user={user} /> : []}
      </div>
      <div className="top-bar-buttons-container">
        <div className="user-builds-buttons">
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
