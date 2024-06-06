import React, { useEffect, useState } from "react"
import Dropzone from "react-dropzone"

import MemeTile from "./MemeTile"

const MemesList = (props) => {
  const [memes, setMemes] = useState([])
  const [newMemeFormData, setNewMemeFormData] = useState({
    title: "",
    image: {}
  })
  
  const getMemes = async () => {
    try {
      const response = await fetch("/api/v1/image-uploading")
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setMemes(body.memes)
    } catch (error) {
      console.error(`Error in getMemes Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getMemes()
  }, [])
  
  const memeTiles = memes.map((meme) => {
    return (
      <MemeTile
        key={meme.id}
        meme={meme}
      />
    )
  })

  const handleInputChange = (event) => {
    event.preventDefault()
    setNewMemeFormData({
      ...newMemeFormData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleImageUpload = (acceptedImage) => {
    // sets state for the image we want to post
    setNewMemeFormData({
      ...newMemeFormData,
      image: acceptedImage[0]
    })
  }

  console.log(newMemeFormData)

  const addMeme = async (event) => {
    event.preventDefault()
    const newMemeBody = new FormData()
    newMemeBody.append("title", newMemeFormData.title)
    newMemeBody.append("image", newMemeFormData.image)
  
    // formData is a special JS object. If we use the entries method on it, we can see our data after file upload
    // for (let pair of newMemeBody.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    
    try {
      const response = await fetch("/api/v1/image-uploading", {
        method: "POST",
        headers: {
          "Accept": "image/jpeg"
        },
        body: newMemeBody
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setMemes([
        ...memes,
        body.meme
      ])
    } catch (error) {
      console.error(`Error in addMeme Fetch: ${error.message}`)
    }
  }

  return (
    <div>
      <h1>Fresh Memes</h1>
      
      <form className="callout primary" onSubmit={addMeme}>
        <div>
          <label htmlFor="title"> Title </label>
          <input 
            id="title"
            name="title"
            value={newMemeFormData.title}
            onChange={handleInputChange}
          />
        </div>

        <Dropzone onDrop={handleImageUpload}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Upload Your Meme - drag 'n' drop or click to upload</p>
              </div>
            </section>
          )}
        </Dropzone>

        <input className="button" type="submit" value="Add" />
      </form>
      
      <div>
        {memeTiles}
      </div>
    </div>
  )
}

export default MemesList