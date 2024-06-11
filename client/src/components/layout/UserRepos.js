import React, { useEffect, useState } from "react"

const UserRepos = (props) => {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("/api/v1/github-user-sessions/repos")
        if (!response.ok) {
          const newError = new Error("Error in the fetch!")
          throw newError
        }
        setRepos(response.data)
      } catch (error) {
        console.error("Error fetching repositories:", error)
      }
    }
    fetchRepos()
  }, [])

  const reposList = repos.map((repo) => (
    <li key={repo.id}>
      <a href={repo.html_url}>
        {repo.name}
      </a>
    </li>
  ))

  return (
    <div>
      <h2>Your Repositories</h2>
      <ul>
        {reposList}
      </ul>
    </div>
  )
}

export default UserRepos
