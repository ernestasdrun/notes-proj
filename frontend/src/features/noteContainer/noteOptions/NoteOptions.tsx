import React, { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Divider, List, ListItemButton, ListItemText, Paper, Stack, ToggleButton, ToggleButtonGroup, useMediaQuery } from "@mui/material";
import SearchBar from "./optionComponents/SearchBar";
import SortBy from "./optionComponents/SortBy";
import { Note } from "../../../models/note";
import CategoryButtonMobile from "./optionComponents/CategoryButtonMobile";
import NewCategoryButton from "./optionComponents/NewCategoryButton";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IUser, resetCategories } from "../../auth/authSlice";
import CategotyDialog from "./CategoryDialog";
import { styled } from "@mui/system";

interface NoteOptionsProps {
    notes: Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
}

const StyledButton = styled(ToggleButton)(({ theme }) => ({
    ":focus-visible": {
        outline: `3px solid ${theme.palette.border.main}`,
    },
}))

const NoteOptions = ({ notes, setNotes, setSearchValue }: NoteOptionsProps) => {
    const user = useAppSelector((state) => state.auth.user) as IUser;
    const smallScreen = useMediaQuery("(max-width:730px)");
    const mobileScreen = useMediaQuery("(max-width:600px)");
    const dispatch = useAppDispatch();

    const [originalNotes, setOriginalNotes] = useState<Note[]>(notes);

    const [newCategoryDialog, setNewCategoryDialog] = useState(false);

    const [alignment, setAlignment] = useState(user?.categories[0]);

    useEffect(() => {
        if (alignment === user?.categories[0]) {
            setOriginalNotes(notes);
        }
    }, [notes])

    const handleChangeAndFilter = (
        event: React.MouseEvent<HTMLElement>,
        newValue: string,
    ) => {
        setAlignment(newValue);
        if (newValue != user.categories[0]) {
            const filteredNotes = [...originalNotes].filter(note => note.category === newValue || note.category === user.categories[0]);
            setNotes(filteredNotes);
        } else {
            setNotes(originalNotes);
        }
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            p={1}
        >
            {newCategoryDialog &&
                <CategotyDialog
                    open={newCategoryDialog}
                    onDismiss={() => setNewCategoryDialog(false)}
                    onCategorySaved={(newCategory) => {
                        dispatch(resetCategories(newCategory));
                        setNewCategoryDialog(false);
                    }}
                />
            }
            {smallScreen ?
                <Box p={1}>
                    <CategoryButtonMobile />
                </Box>
                :
                <Box p={1} sx={{ whiteSpace: "nowrap", overflowX: "hidden", ":hover": { overflowX: "auto" } }}>
                    <NewCategoryButton setNewCategoryDialog={setNewCategoryDialog} />
                    <ToggleButtonGroup exclusive value={alignment} color="secondary" sx={{ height: "37px" }}>
                        {user?.categories.map((category, index) => (
                            <StyledButton key={index} value={category} disableRipple onClick={(e) => handleChangeAndFilter(e, category)}>{category}</StyledButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>
            }
            <Stack
                p={1}
                alignSelf="flex-start"
                direction="row"
                alignItems="stretch"
                spacing={1}
            >
                {!mobileScreen && <Divider orientation="vertical" flexItem />}
                <SearchBar setSearchValue={setSearchValue} />
                <SortBy notes={notes} setNotes={setNotes} originalNotes={originalNotes} setOriginalNotes={setOriginalNotes} />
            </Stack>
        </Stack>
    );
};

export default NoteOptions;