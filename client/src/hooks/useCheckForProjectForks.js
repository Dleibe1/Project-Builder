import doesProjectHaveForks from "../api/doesProjectHaveForks"
import { useEffect, useState } from "react"

const useCheckForProjectForks = (id) => {
  const [hasForks, setHasForks] = useState(false)
  useEffect(() => {
    const fetchHasForks = async () => {
      try {
        const forkExists = await doesProjectHaveForks(id)
        setHasForks(forkExists)
      } catch (error) {
        console.error("Error in doesProjectHaveForks() Fetch: ", error)
      }
    }
    fetchHasForks()
  }, [])
  return hasForks
}

export default useCheckForProjectForks