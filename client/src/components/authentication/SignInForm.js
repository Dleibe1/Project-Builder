import React, { useState, useEffect } from "react"
import { Button, TextField } from "@mui/material"

import config from "../../config"
import signInUser from "../../api/signInUser"
import FormError from "../project-forms/project-forms-shared/FormError"

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [errors, setErrors] = useState({})
  const [credentialsErrors, setCredentialsErrors] = useState("")

  useEffect(() => {
    document.body.classList.add("hide-background")

    return () => {
      document.body.classList.remove("hide-background")
    }
  }, [])

  const validateInput = (payload) => {
    setErrors({})
    setCredentialsErrors("")
    const { email, password } = payload
    const emailRegexp = config.validation.email.regexp.emailRegex
    let newErrors = {}
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      }
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      }
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(userPayload)) {
      try {
        await signInUser(userPayload)
        setShouldRedirect(true)
      } catch (error) {
        if (error.credentialsErrors) {
          return setCredentialsErrors(error.credentialsErrors)
        } else {
          console.error("Error in signInUser() Fetch", error)
        }
      }
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  if (shouldRedirect) {
    location.href = "/?page=1"
  }

  return (
    <div className="sign-in standard-sign-in" onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <form id="sign-in-form" data-cy="sign-in-form">
        {credentialsErrors ? <p className="callout alert">{credentialsErrors}</p> : null}
        <div className="email-input-container">
          <TextField
            value={userPayload.email}
            onChange={onInputChange}
            fullWidth
            className="sign-in email-input"
            label="Email"
            data-cy="sign-in-form__email-input"
            name="email"
          />
          <FormError error={errors.email} />
        </div>
        <div className="password-input-container">
          <TextField
            value={userPayload.password}
            onChange={onInputChange}
            fullWidth
            data-cy="sign-in-form__password-input"
            type="password"
            className="sign-in password-input"
            label="Password"
            name="password"
          />
          <FormError error={errors.password} />
        </div>
        <div className="submit-button-container">
          <Button type="submit" className="large-button sign-in-button">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
