import React from 'react'
import { styled, Input, InputAdornment, Theme, Palette, useTheme } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';



const StyledSearchBar = styled(Input)(({ theme }) => ({
    padding: "0 4px",
    borderRadius: "20px",
    border: `1px solid ${theme.palette.search.border}`,
    backgroundColor: theme.palette.search.background,
}))

const SearchBar = () => {

    return (
        <StyledSearchBar
            type="search"
            placeholder="Search..."
            autoComplete="off"
            disableUnderline
            startAdornment={
                <InputAdornment position="start" onClick={() => console.log("help")}>
                    <SearchRoundedIcon />
                </InputAdornment>
              }
        />
    )
}

export default SearchBar;