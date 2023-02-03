import React from 'react';
import { Card, CardContent, CardActions, Typography, Box, Divider, useTheme, dividerClasses, DividerProps, Button, IconButton, useMediaQuery, Tooltip } from '@mui/material';
import { Note as NoteModel } from '../models/note';
import { styled } from '@mui/system';
import { formatDate } from '../utils/formatDate';
import DeleteIcon from '@mui/icons-material/Delete';
/*
const StyledCard = styled(Card)(({ theme }) => ({
    minWidth: "200px",
    maxWidth: "400px",
    height: "200px",
    borderRadius: "3%",
    ":hover": {
        boxShadow: theme.palette.mode === "dark" ? "0 0 11px #e4e2e233" : "0 0 11px #03030333",
        cursor: "pointer",
    },
    "& .MuiCardContent-root": {
        padding: 5,
        "& 	.MuiTypography-root": {
            padding: 0
        },
        "& .MuiTypography-h4": {
            
        },
        "& .MuiTypography-body2": {
            whiteSpace: "pre-line",
        },
        "& .MuiTypography-caption": {
            
        },
        "& .MuiDivider-root": {
            //background: "red",
            marginBottom: "7px"
        }
    },
}));
*/
const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== "screenSize",
})<{ screenSize?: boolean }>(({ theme, screenSize }) => ({
    minWidth: "250px",
    width: screenSize ? "300px" : "auto",
    height: "200px",
    borderRadius: "3%",
    ":hover": {
        boxShadow: theme.palette.mode === "dark" ? "0 0 11px #e4e2e233" : "0 0 11px #03030333",
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
            //background: "red",
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
        <StyledCard screenSize={smallScreen} onClick={() => onNoteClicked(note)}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" p="4px 8px 4px 8px">
                    <Box width="85%" maxHeight="28px" sx={{ maskImage: "linear-gradient(90deg, #000 90%, transparent)" }}>
                        <Typography variant="h4" >
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