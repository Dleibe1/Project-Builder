import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { styled, alpha } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))

const NavBarSearch = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const history = useHistory()
  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }
  
  useEffect(() => {
    if (location.pathname !== "/search") {
      setQuery("")
    } 
  }, [location.pathname])

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && query.trim().length) {
      event.preventDefault()
      history.push(`/search?q=${query}&page=1`)
    } else if (event.key === "Enter" && query.trim().length === 0) {
      event.preventDefault()
      history.push(`/?page=1`)
    }
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        value={query}
        inputProps={{
          "data-cy": "search-bar",
          "aria-label": "search",
          className: "top-bar-search",
        }}
      />
    </Search>
  )
}

export default NavBarSearch
