import React from 'react';
import { Card, CardContent, Typography, Box, Divider, useMediaQuery } from '@mui/material';
import { Note as NoteModel } from '../../../models/note';
import { styled } from '@mui/system';
import { formatDate } from '../../../utils/formatDate';
import DeleteButton from '../../../components/buttons/DeleteButton';

const StyledCard = styled(Card)<{ screen: boolean }>(({ theme, screen }) => ({
    width: screen ? "90vw" : "auto",
    height: "200px",
    borderRadius: "3%",
    transitionProperty: "box-shadow, transform",
    transitionDuration: "350ms",
    transitionTimingFunction: "ease",
    ":focus-visible": {
        outline: `4px solid ${theme.palette.secondary.main}`,
        transform: "translateY(-8px)",
        boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.2)",
    },
    ":hover": {
        transform: "translateY(-8px)",
        boxShadow: "0px 1px 10px 1px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
    },
    "& .MuiCardContent-root": {
        padding: 5,
        "& 	.MuiTypography-root": {
            padding: 0
        },
        "& .MuiTypography-h4": {
            whiteSpace: "nowrap",
            overflow: "hidden",
        },
        "& .MuiTypography-body2": {
            whiteSpace: "pre-line",
            overflowWrap: "break-word",
        },
        "& .MuiDivider-root": {
            marginBottom: "5px"
        }
    },
}));


interface INoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void;
    onDeleteNote: (note: NoteModel) => void;
}

const Note = ({ note, onNoteClicked, onDeleteNote }: INoteProps) => {

    const smallScreen = useMediaQuery('(max-width:599px)');

    const {
        title,
        text,
        createdAt,
        updatedAt,
    } = note;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(updatedAt);
    }

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.code === "Enter") {
            onNoteClicked(note);
        }
    }

    return (
        <StyledCard screen={smallScreen} onKeyDown={(e) => handleKeyDown(e)} onClick={() => onNoteClicked(note)} tabIndex={0}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" p="4px 8px 4px 8px">
                    <Box width="85%" maxHeight="28px" sx={{ maskImage: "linear-gradient(90deg, #000 90%, transparent)" }}>
                        <Typography variant="h4">
                            {title}
                        </Typography>
                    </Box>
                    <DeleteButton size="medium" note={note} onDeleteNote={onDeleteNote}/>
                </Box>
                <Divider />
                <Box height="110px" px="8px" sx={{ overflowY: "hidden", maskImage: "linear-gradient(180deg, #000 60%, transparent)" }}>
                    <Typography variant="body2">
                        {text}
                    </Typography>
                </Box>
                <Divider />
                <Typography variant="caption">
                    {createdUpdatedText}
                </Typography>
            </CardContent>
        </StyledCard>
    )
}

export default Note;