import React from "react"
import GithubLogin from "../authentication/GithubLogin"

const UsernameTile = ({ user }) => {
  if (user.userName) {
    return <h5 className="user-logged-in">{user.userName}</h5>
  } else if (user.githubUserName) {
    return <h5 className="user-logged-in">{user.githubUserName}</h5>
  }
}

export default UsernameTile
