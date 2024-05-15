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
    <Link className="new-build-container" to="/create-new-build">
      <button type="button" className="new-build-button">
        + New Build
      </button>
    </Link>,
  ]

  if(!user){
    newBuildButton = []
  }

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <Link to="/">
          <img src="https://i.imgur.com/Y9merbS.png" className="logo" />
        </Link>
        <ul className="menu"></ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
        {newBuildButton}
      </div>
    </div>
  )
}

export default TopBar
