import React from "react"

const GithubCallback = (props) => {
  const params = new URLSearchParams(location.search)
  const name = params.get("name")
  const login = params.get("login")

  return (
    <div>
      <h1>
        Welcome, {name} {login})!
      </h1>
    </div>
  )
}

export default GithubCallback
