import doesProjectHaveForks from "../api/doesProjectHaveForks"
import { useEffect, useState } from "react"

const useCheckForProjectForks = (id) => {
  const [hasForks, setHasForks] = useState(false)
  useEffect(() => {
    doesProjectHaveForks(id).then((forkExists) => {
      setHasForks(forkExists)
    })
  }, [])
  return hasForks
}

export default useCheckForProjectForks
