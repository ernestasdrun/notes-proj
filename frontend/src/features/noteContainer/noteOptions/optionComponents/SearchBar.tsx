import React, { useState, useRef, useEffect } from "react";
import { styled, Input, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface SearchBarProps {
    searchValue: string,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
}

const StyledSearchBar = styled(Input)(({ theme }) => ({
    padding: "0 4px",
    minWidth: "80px",
    borderRadius: "20px",
    border: `1px solid ${theme.palette.search.border}`,
    backgroundColor: theme.palette.search.background,
}));

const SearchBar = ({ searchValue, setSearchValue }: SearchBarProps) => {

    return (
        <StyledSearchBar
            value={searchValue}
            type="search"
            placeholder="Search..."
            autoComplete="off"
            disableUnderline
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            startAdornment={
                <InputAdornment position="start" onClick={() => console.log("help")}>
                    <SearchRoundedIcon />
                </InputAdornment>
            }
        />
    );
};

export default SearchBar;