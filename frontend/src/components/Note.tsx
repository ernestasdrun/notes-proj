import React from 'react';
import { Card, CardContent, Typography, Box, Divider, IconButton, useMediaQuery, Tooltip } from '@mui/material';
import { Note as NoteModel } from '../models/note';
import { styled } from '@mui/system';
import { formatDate } from '../utils/formatDate';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== "screenSize",
})<{ screenSize?: boolean }>(({ theme, screenSize }) => ({
    width: screenSize ? "90vw" : "auto",
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
        boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.2)",
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
        "& .MuiTypography-caption": {
            
        },
        "& .MuiDivider-root": {
            marginBottom: "7px"
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

    return (
        <StyledCard screenSize={smallScreen} onClick={() => onNoteClicked(note)} tabIndex={0}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" p="4px 8px 4px 8px">
                    <Box width="85%" maxHeight="28px" sx={{ maskImage: "linear-gradient(90deg, #000 90%, transparent)" }}>
                        <Typography variant="h4">
                            {title}
                        </Typography>
                    </Box>
                    <Tooltip arrow disableInteractive title="Delete" placement="top" enterDelay={500}>
                        <IconButton onClick={(e) => {
                            onDeleteNote(note);
                            e.stopPropagation();
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
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