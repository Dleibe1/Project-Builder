import React from "react"
import { useState, useEffect } from "react"

const GithubCallback = (props) => {
  const [userInfo, setUserInfo] = useState({})

  const getUserInfo = () => {
    const params = new URLSearchParams(location.search)
    const name = params.get("name")
    const login = params.get("login")
    return { name, login }
  }

  useEffect(() => {
    const userInfo = getUserInfo()
    setUserInfo(userInfo)
  }, [])

  return (
    <div>
      <h1>
        Welcome, {userInfo.name} {userInfo.login}!
      </h1>
    </div>
  )
}

export default GithubCallback
