import React, { useState, useEffect } from "react";
import { Box, Divider, Stack, ToggleButton, ToggleButtonGroup, useMediaQuery } from "@mui/material";
import SearchBar from "./optionComponents/SearchBar";
import SortBy from "./optionComponents/SortBy";
import { Note } from "../../../models/note";
import CategoryButtonMobile from "./optionComponents/CategoryButtonMobile";
import NewCategoryButton from "./optionComponents/NewCategoryButton";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IUser, resetCategories } from "../../auth/authSlice";
import CategotyDialog from "./CategoryDialog";
import { styled } from "@mui/system";
import { Group } from "../../../models/group";

interface NoteOptionsProps {
    notes: Note[],
    originalNotes: Note[],
    currentContent?: Group | null,
    categoryContainer: Group | IUser,
    searchValue: string,
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    setOriginalNotes: React.Dispatch<React.SetStateAction<Note[]>>,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
    setCurrentContent: React.Dispatch<React.SetStateAction<Group | null>>,
    setCategoryContainer: React.Dispatch<React.SetStateAction<IUser | Group>>,
}

const StyledButton = styled(ToggleButton)(({ theme }) => ({
    ":focus-visible": {
        outline: `3px solid ${theme.palette.border.main}`,
    },
}))

const NoteOptions = ({ notes, originalNotes, currentContent, categoryContainer, searchValue, setNotes, setOriginalNotes, setSearchValue, setCurrentContent, setCategoryContainer }: NoteOptionsProps) => {
    const user = useAppSelector((state) => state.auth.user) as IUser;
    const smallScreen = useMediaQuery("(max-width:730px)");
    const mobileScreen = useMediaQuery("(max-width:600px)");
    const dispatch = useAppDispatch();

    //const [originalNotes, setOriginalNotes] = useState<Note[]>(notes);

    const [newCategoryDialog, setNewCategoryDialog] = useState<boolean>(false);

    const [alignment, setAlignment] = useState<string>(categoryContainer?.categories[0]);

    useEffect(() => {
        if (currentContent) {
            setCategoryContainer(currentContent);
        } else {
            setCategoryContainer(user);
        }
    }, [currentContent, user])

    useEffect(() => {
        if (alignment === categoryContainer?.categories[0]) {
            setOriginalNotes(notes);
        }
    }, [notes])

    const handleChangeAndFilter = (
        event: React.MouseEvent<HTMLElement>,
        newValue: string,
    ) => {
        setAlignment(newValue);
        if (newValue != categoryContainer.categories[0]) {
            const filteredNotes = [...originalNotes].filter(note => note.category === newValue || note.category === categoryContainer.categories[0]);
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
                        if (categoryContainer === user) {
                            dispatch(resetCategories(newCategory));
                        } else {
                            setCategoryContainer(newCategory as Group);
                        }
                        setNewCategoryDialog(false);
                    }}
                    categoryContainer={categoryContainer}
                />
            }
            {smallScreen ?
                <Box p={1}>
                    <CategoryButtonMobile currentContent={currentContent} setCurrentContent={setCurrentContent} categoryContainer={categoryContainer} setNewCategoryDialog={setNewCategoryDialog} handleChangeAndFilter={handleChangeAndFilter} value={alignment} setNotes={setNotes} notes={notes} originalNotes={originalNotes} setOriginalNotes={setOriginalNotes} setCategoryContainer={setCategoryContainer}/>
                </Box>
                :
                <Box p={1} sx={{ whiteSpace: "nowrap", overflowX: "hidden", ":hover": { overflowX: "auto" } }}>
                    <NewCategoryButton setNewCategoryDialog={setNewCategoryDialog} />
                    <ToggleButtonGroup exclusive value={alignment} color="secondary" sx={{ height: "37px" }}>
                        {categoryContainer?.categories.map((category, index) => (
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
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
                <SortBy notes={notes} setNotes={setNotes} originalNotes={originalNotes} currentContent={currentContent} setOriginalNotes={setOriginalNotes} />
            </Stack>
        </Stack>
    );
};

export default NoteOptions;