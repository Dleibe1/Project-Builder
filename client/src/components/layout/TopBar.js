import React from "react"
import { Link, useLocation } from "react-router-dom"

import SignOutButton from "../authentication/SignOutButton"

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link className="sign-in" to="/user-sessions/new">
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
    <Link
      key={"new-build-button"}
      id="new-build-button"
      className="part-button"
      to="/create-new-build"
    >
      + New Build
    </Link>,
  ]

  let myBuildsButton = [
    <Link key={"my-builds"} id="my-builds" className="part-button " to="/my-builds">
      My Builds
    </Link>,
  ]

  const { pathname } = useLocation()

  return (
    <div className="top-bar">
      <div>
        <div>
          <div className="top-bar-left-container">
            <Link id="logo-container" to="/">
              <img src="https://i.imgur.com/Y9merbS.png" className="logo" />
            </Link>
            {user ? <h5 className="user-logged-in">{user.userName}</h5> : []}
          </div>
        </div>
        <ul className="menu"></ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
        {user && pathname !== "/create-new-build" ? newBuildButton : []}
        {user && pathname !== "/my-builds" ? myBuildsButton : []}
      </div>
    </div>
  )
}

export default TopBar
