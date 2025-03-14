import React, { useEffect } from "react"

const About = (props) => {
  useEffect(() => {
    document.body.classList.add("hide-background")
    window.scrollTo(0, 0)
    return () => {
      document.body.classList.remove("hide-background")
    }
  }, [])

  return (
    <>
      <div className="banner about-page-section-container-left top-banner">
        <img className="banner-image" src="https://i.imgur.com/dOywizt.png" />
        <h1>Create and Fork Micro Controller Projects</h1>
      </div>
      <div className="banner second-banner about-page-section-container-right">
        <img className="banner-image" src="https://i.imgur.com/n8C2mDO.png" />
        <h1>Project builder helps you create and share your own version of an interesting project</h1>
      </div>
      <div className="banner third-banner about-page-section-container-left">
        <img className="banner-image" src="https://i.imgur.com/sIR4iQX.png" />
        <h1>Keep some of the parts, instructions, and code from another user's project but add some new features</h1>
      </div>
      <div className="banner fourth-banner about-page-section-container-right">
        <img className="banner-image" src="https://i.imgur.com/zNVBrY3.png" />
        <h1>With Project Builder you can fork a project's code, parts, and instructions to build it</h1>
      </div>
      <div className="banner fifth-banner about-page-section-container-left">
        <img className="banner-image" src="https://i.imgur.com/dOywizt.png" />
        <h1>Sign up for an account or login with GitHub to join the project builder community!</h1>
      </div>
      <div className="end-about-page">
      </div>
    </>
  )
}

export default About