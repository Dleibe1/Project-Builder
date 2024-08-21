import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useSearch } from "../contexts/SearchContext"
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

const TopBarSearch = ({ projectsPerPage }) => {
  const [query, setQuery] = useState("")
  const { setSearchResults } = useSearch()
  const history = useHistory()

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
	  history.push(`/search/${query}`)
      executeSearch(query)
    }
  }

  const executeSearch = async (searchQuery) => {
    if (searchQuery) {
      try {
        const response = await fetch(`/api/v1/search/${searchQuery}/${projectsPerPage}`)
        if (!response.ok) {
          const newError = new Error("Error in the fetch!")
          throw newError
        }
        const responseBody = await response.json()
        setSearchResults(responseBody.projects)
      } catch (error) {
        console.log(error)
      }
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
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  )
}

export default TopBarSearch
