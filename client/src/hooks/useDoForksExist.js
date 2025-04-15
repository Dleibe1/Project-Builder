import doesProjectHaveForks from "../api/doesProjectHaveForks"
import { useEffect, useState } from "react"

const useDoForksExist = (id) => {
  const [hasForks, setHasForks] = useState(false)
  useEffect(() => {
    doesProjectHaveForks(id).then((doesForkExist) => {
      setHasForks(doesForkExist)
    })
  }, [id])
  return hasForks
}

export default useDoForksExist
