import React, { useState, useEffect } from "react"
import { Button, TextField } from "@mui/material"

import config from "../../config"

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
        const response = await fetch("/api/v1/user-sessions", {
          method: "POST",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
        if (!response.ok) {
          if (response.status === 401) {
            const body = await response.json()
            return setCredentialsErrors(body.message)
          }
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
        const userData = await response.json()
        setShouldRedirect(true)
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`)
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
      {credentialsErrors ? <p className="callout alert">{credentialsErrors}</p> : null}
      <form id="sign-in-form">
        <div>
          <TextField
            value={userPayload.email}
            onChange={onInputChange}
            fullWidth
            className="sign-in email-input"
            label="Email"
            name="email"
          />
          <FormError error={errors.email} />
        </div>
        <div>
          <TextField
            value={userPayload.password}
            onChange={onInputChange}
            fullWidth
            type="password"
            className="sign-in password-input"
            label="Password"
            name="password"
          />
          <FormError error={errors.password} />
        </div>
        <div>
          <Button type="submit" className="large-button sign-in-button">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
