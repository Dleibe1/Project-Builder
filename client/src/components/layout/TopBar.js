import React from "react"
import { Link } from "react-router-dom"

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
    <Link id="new-build-button" className="part-button" to="/create-new-build">
      + New Build
    </Link>,
  ]

  let myBuildsButton = [
    <h3 id="my-builds" className="part-button ">
      My Builds
    </h3>,
  ]

  if (!user) {
    newBuildButton = []
    myBuildsButton = []
  }

  console.log(newBuildButton)

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div>
          <Link id="logo-container" to="/">
            <img src="https://i.imgur.com/Y9merbS.png" className="logo" />
          </Link>
        </div>
        <ul className="menu"></ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
        {newBuildButton}
        {myBuildsButton}
      </div>
    </div>
  )
}

export default TopBar
