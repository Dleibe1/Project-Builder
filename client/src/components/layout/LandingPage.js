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
        <h1>Create and Fork Micro Controller Projects</h1>
      </div>
      <div className="banner second-banner landing-page-section-container-right">
        <img className="banner-image" src="https://i.imgur.com/4e9OsdZ.png" />
        <h1>Forking a project is the sincerest form of flattery.</h1>
      </div>
      <div className="banner third-banner landing-page-section-container-left">
        <img className="banner-image" src="https://i.imgur.com/n8C2mDO.png" />
        <h1>Sometimes one project's code can be used with a different set of parts.</h1>
      </div>
      <div className="banner fourth-banner landing-page-section-container-right">
        <img className="banner-image" src="https://i.imgur.com/zNVBrY3.png" />
        <h1>With Project Builder, you can fork a project's parts, code or both.</h1>
      </div>
    </>
  )
}

export default LandingPage
