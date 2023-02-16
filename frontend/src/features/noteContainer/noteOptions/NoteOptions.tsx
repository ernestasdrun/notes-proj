import React from "react";
import { Divider, Stack } from "@mui/material";
import CategoryButton from "./optionComponents/CategoryButton";
import SearchBar from "./optionComponents/SearchBar";
import SortBy from "./optionComponents/SortBy";

const NoteOptions = () => {
    return (
        <Stack

            direction="row"
            alignItems="center"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
            height="35px"
        >
            <CategoryButton />
            <Stack
                width="100%"
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
                height="35px"
            >
                <SearchBar />
                <SortBy />
            </Stack>
        </Stack>
    );
};

export default NoteOptions;