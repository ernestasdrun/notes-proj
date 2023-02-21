import React from "react";
import { Button, Divider, Stack, useMediaQuery } from "@mui/material";
import SearchBar from "./optionComponents/SearchBar";
import SortBy from "./optionComponents/SortBy";
import { Note } from "../../../models/note";
import CategoryButtonMobile from "./optionComponents/CategoryButtonMobile";
import NewCategoryButton from "./optionComponents/NewCategoryButton";

interface NoteOptionsProps {
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
}

const NoteOptions = ({ notes, setNotes }: NoteOptionsProps) => {
    const smallScreen = useMediaQuery('(max-width:730px)');

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            height="35px"
        >
            {smallScreen ?
                <CategoryButtonMobile />
                :
                <Stack
                    flexDirection="row"
                    justifyContent="center"
                    height="35px"
                    gap={1}
                >
                    <NewCategoryButton />
                    <Button variant="outlined">Text</Button>
                    <Button variant="outlined"/>
                </Stack>
            }
            <Stack
                alignSelf="flex-end"
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
                height="35px"
            >
                <SearchBar />
                <SortBy notes={notes} setNotes={setNotes} />
            </Stack>
        </Stack>
    );
};

export default NoteOptions;