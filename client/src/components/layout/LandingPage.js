import React, { useEffect } from "react"

const LandingPage = (props) => {
  useEffect(() => {
    document.body.classList.add("hide-background")

    return () => {
      document.body.classList.remove("hide-background")
    }
  }, [])

  return (
    <>
      <div className="banner landing-page-section-container-left top-banner">
        <img className="banner-image" src="https://i.imgur.com/dOywizt.png" />
        <h1>Create and Fork Micro Controller Projects.</h1>
      </div>
      <div className="banner second-banner landing-page-section-container-right">
        <img className="banner-image" src="https://i.imgur.com/9hI9Tds.png" />
        <h1>Forking a project is the sincerest form of flattery.</h1>
      </div>
    </>
  )
}

export default LandingPage
