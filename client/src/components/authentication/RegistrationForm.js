import React, { useState, useEffect } from "react"
import { Button, TextField } from "@mui/material"

import config from "../../config"
import registerUser from "../../api/registerUser"
import ErrorList from "../project-forms/project-forms-shared/ErrorList"
import FormError from "../project-forms/project-forms-shared/FormError"

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    userName: "",
  })

  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    document.body.classList.add("hide-background")

    return () => {
      document.body.classList.remove("hide-background")
    }
  }, [])

  const validateInput = (payload) => {
    setErrors({})
    setServerErrors({})
    const { email, password, passwordConfirmation, userName } = payload
    const emailRegexp = config.validation.email.regexp.emailRegex
    let newErrors = {}
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      }
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      }
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      }
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        }
      }
    }
    if (userName.trim() === "") {
      newErrors = {
        ...newErrors,
        userName: "is required",
      }
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (validateInput(userPayload)) {
      registerUser(userPayload)
        .then(() => {
          return setShouldRedirect(true)
        })
        .catch((error) => {
          if (error.serverErrors) {
            return setServerErrors(error.serverErrors)
          } else {
            console.error("Error in registerUser() Fetch:", error)
          }
        })
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
    <div className="grid-container sign-in registration">
      <h1>Register</h1>
      <form data-cy="registration-form" id="registration-form" onSubmit={onSubmit}>
        <ErrorList errors={serverErrors} />
        <div>
          <TextField
            value={userPayload.email}
            onChange={onInputChange}
            fullWidth
            className="registration email-input"
            data-cy="registration-form__email-input"
            label="Email"
            name="email"
          />
          <FormError error={errors.email} />
        </div>
        <div className="username-input-container">
          <TextField
            value={userPayload.userName}
            onChange={onInputChange}
            fullWidth
            className="registration"
            data-cy="registration-form__username-input"
            label="Username"
            name="userName"
          />
          <FormError error={errors.userName} />
        </div>
        <div className="password-input-container">
          <TextField
            value={userPayload.password}
            onChange={onInputChange}
            fullWidth
            className="registration"
            data-cy="registration-form__password-input"
            label="Password"
            type="password"
            name="password"
          />
          <FormError error={errors.password} />
        </div>
        <div className="password-confirmation-input-container">
          <TextField
            value={userPayload.passwordConfirmation}
            onChange={onInputChange}
            fullWidth
            className="registration"
            data-cy="registration-form__password-confirmation-input"
            label="Password Confirmation"
            type="password"
            name="passwordConfirmation"
          />
          <FormError error={errors.passwordConfirmation} />
        </div>
        <div className="submit-button-container">
          <Button data-cy="submit" type="submit" className="large-button register-button">
            Register
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm
