import React from "react"

const MemeTile = (props) => {

  return (
    <div className="callout secondary">
      <h3>{props.meme.title}</h3>
      <img src={props.meme.image} />
    </div>
  )
}

export default MemeTile