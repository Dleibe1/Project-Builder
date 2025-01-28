import React, { useState, useEffect } from "react"

import config from "../../config"

import ErrorList from "../layout/ErrorList"
import FormError from "../layout/FormError"
import translateServerErrors from "../../services/translateServerErrors"

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

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      if (validateInput(userPayload)) {
        const response = await fetch("/api/v1/users", {
          method: "POST",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
        if (!response.ok) {
          if (response.status === 422) {
            const body = await response.json()
            const newServerErrors = translateServerErrors(body.errors)
            return setServerErrors(newServerErrors)
          }
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
        return setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
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
      <ErrorList errors={serverErrors} />
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Enter Desired Username
            <input
              type="text"
              name="userName"
              value={userPayload.userName}
              onChange={onInputChange}
            />
            <FormError error={errors.userName} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm
