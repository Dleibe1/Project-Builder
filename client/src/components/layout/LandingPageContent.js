import React, { useEffect } from "react"

const LandingPageContent = (props) => {
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
        <img className="banner-image" src="https://i.imgur.com/L0awTWh.png" />
        <h1>Forking a project is the sincerest form of flattery.</h1>
      </div>
    </>
  )
}

export default LandingPageContent

{
  /* <div className="landing-page-section-left">
<img
  className="landing-page-image-left"
  src="https://www.youmaketech.com/wp-content/uploads/2021/06/Thumbnail1_transparent.png"
/>
</div>
<div className="landing-page-section-right">
<img
  className="landing-page-image-right"
  src="https://www.xiaorgeek.net/cdn/shop/files/DS_wireless_rc_smart_robot_car_800x.png?v=1715744622"
/>
</div> */
}
