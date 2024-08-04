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
        <h1>Forking a project is the sincerest form of flattery</h1>
      </div>
      <div className="banner third-banner landing-page-section-container-left">
        <img className="banner-image" src="https://i.imgur.com/n8C2mDO.png" />
        <h1>Keep another project's code but fork the set of parts</h1>
      </div>
      <div className="banner fourth-banner landing-page-section-container-right">
        <img className="banner-image" src="https://i.imgur.com/zNVBrY3.png" />
        <h1>With Project Builder you can fork a project's parts AND code </h1>
      </div>
      <div className="banner fifth-banner landing-page-section-container-left">
        <img className="banner-image" src="https://i.imgur.com/dOywizt.png" />
        <h1>Sign up for an account or login with GitHub to share your own projects or fork someone else's project</h1>
      </div>
      {/* <div className="happy-building banner">
        <h1>Happy Building!</h1>
      </div> */}
      <div className="end-landing-page">
      </div>
    </>
  )
}

export default LandingPage
