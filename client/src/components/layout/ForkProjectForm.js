import React, { useState, useEffect } from "react"
import { Redirect, useParams } from "react-router-dom"
import translateServerErrors from "../../services/translateServerErrors.js"
import ErrorList from "./ErrorList.js"
import prepForFrontEnd from "../../services/prepForFrontEnd.js"

const ForkProjectForm = (props) => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [part, setPart] = useState("")
  const [image, setImage] = useState("")
  const params = useParams()
  const { id } = params

  useEffect(() => {
    getProject()
  }, [])

  const [forkedProject, setForkedProject] = useState({
    title: "",
    tags: "",
    appsAndPlatforms: "",
    images: [],
    parts: [],
    description: "",
    code: "",
    githubFileURL: "",
    userId: "",
    thumbnailImageURL: "",
  })

  const getProject = async () => {
    try {
      const response = await fetch(`/api/v1/project-forks/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      let fork = responseBody.fork
      prepForFrontEnd(fork)
      setForkedProject(fork)
    } catch (error) {
      console.log(error)
    }
  }

  const postForkedProject = async (forkedProjectData) => {
    try {
      const response = await fetch(`/api/v1/project-forks/${id}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(forkedProjectData),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        }
      }
      setShouldRedirect(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (event) => { 
    event.preventDefault()
    console.log(forkedProject)
    postForkedProject({ ...forkedProject, githubFileURL: forkedProject.githubFileURL.trim() })
  }

  const handleInputChange = (event) => {
    setForkedProject({ ...forkedProject, [event.currentTarget.name]: event.currentTarget.value })
  }

  const handlePartInput = (event) => {
    setPart(event.currentTarget.value)
  }

  const handleImageURLInput = (event) => {
    setImage(event.currentTarget.value)
  }

  const handlePartSubmit = () => {
    if (part.length) {
      setForkedProject({ ...forkedProject, parts: [...forkedProject.parts, part] })
    }
    setPart("")
  }

  const handleImageURLSubmit = () => {
    if (image.length) {
      setForkedProject({ ...forkedProject, images: [...forkedProject.images, image.trim()] })
    }
    setImage("")
  }

  const handlePartDelete = (index) => {
    const partsList = forkedProject.parts.filter((part, i) => i !== index)
    setForkedProject({ ...forkedProject, parts: partsList })
  }

  const handleImageURLDelete = (index) => {
    const imageList = forkedProject.images.filter((image, i) => i !== index)
    setForkedProject({ ...forkedProject, images: imageList })
  }

  const partsList = forkedProject.parts.map((part, index) => {
    return (
      <div key={part} id="parts-list" className="cell small-3 medium-6 large-4">
        <h5 id="part">{part}</h5>
        <p id="delete-part" onClick={() => handlePartDelete(index)} className="part-button ">
          Delete Part
        </p>
      </div>
    )
  })

  const imageList = forkedProject.images.map((image, index) => {
    return (
      <div id="image-list">
        <img id="image-list-project-form" src={image} />
        <button id="delete-image" onClick={() => handleImageURLDelete(index)}>
          Delete image
        </button>
      </div>
    )
  })

  if (shouldRedirect) {
    return <Redirect push to={"/my-builds"} />
  }

  return (
    <div className="new-build-form ">
      <h4>Fork This Build</h4>
      <ErrorList errors={errors} />
      <form key={"edit-build-form"} onSubmit={handleSubmit}>
        <label htmlFor="title">
          Name of project fork:
          <input onChange={handleInputChange} type="text" value={forkedProject.title} id="title" name="title" />
        </label>
        <label htmlFor="thumbnail-image-url">
          Thumbnail Image URL:
          <input
            value={forkedProject.thumbnailImageURL}
            onChange={handleInputChange}
            type="text"
            id="title"
            name="thumbnailImageURL"
          />
        </label>
        <label htmlFor="tags">
          Tags:
          <input
            value={forkedProject.tags}
            onChange={handleInputChange}
            type="text"
            id="tags"
            name="tags"
          />
        </label>
        <label htmlFor="apps-and-platforms">
          Apps and Platforms:
          <input
            onChange={handleInputChange}
            type="text"
            id="apps-and-platforms"
            name="appsAndPlatforms"
          />
        </label>
        <h5>Parts:</h5>
        {partsList}
        <label htmlFor="part">
          <input value={part} onChange={handlePartInput} type="text" id="parts" name="part" />
          <h3 onClick={handlePartSubmit} className="part-button">
            Add Part
          </h3>
        </label>
        <label htmlFor="description">
          Description:
          <input
            value={forkedProject.description}
            onChange={handleInputChange}
            type="text"
            id="description"
            name="description"
          />
        </label>
        <label htmlFor="code">
          Code:
          <textarea
            value={forkedProject.code}
            rows="20"
            cols="1"
            onChange={handleInputChange}
            type="text"
            id="code"
            name="code"
          />
        </label>
        <label htmlFor="github-url">
          <h5>
            Is this a work in progress? Pasting the URL of your main sketch file on Github will
            automatically keep the code you share up to date.
          </h5>
          <h5>Example: https://github.com/antronyx/ServoTester/blob/main/main.ino</h5>
          Github main sketch file URL:
          <input
            value={forkedProject.githubFileURL}
            onChange={handleInputChange}
            type="text"
            id="github-url"
            name="githubFileURL"
          />
        </label>
        {imageList}
        <label htmlFor="image">
          Add Image URL:
          <input
            value={image}
            onChange={handleImageURLInput}
            type="text"
            id="image-url"
            name="image"
          />
          <h3 onClick={handleImageURLSubmit} className="part-button">
            Add Image URL
          </h3>
        </label>
        <input type="submit" value="Submit Project" />
      </form>
    </div>
  )
}

export default ForkProjectForm
