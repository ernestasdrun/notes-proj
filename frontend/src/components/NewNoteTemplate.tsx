import React from 'react';
import { Typography, Box, Button, IconButton, useMediaQuery } from '@mui/material';
import { Note as NoteModel } from '../models/note';
import { styled } from '@mui/system';

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== "screenSize",
  })<{ screenSize?: boolean }>(({ theme, screenSize }) => ({
    minWidth: "250px",
    width: screenSize ? "300px" : "auto",
    height: "200px",
    borderRadius: "3%",
    border: `3px dashed ${theme.palette.border.main}`,
    background: "rgba(0, 0, 0, 0.1)",
    ":hover": {
        background: "rgba(0, 0, 0, 0.2)",
        boxShadow: theme.palette.mode === "dark" ? "0 0 11px #e4e2e233" : "0 0 11px #03030333",
        cursor: "pointer",
    },
    "& 	.MuiTypography-h3": {
        fontSize: "44px",
    },

  }));


interface INoteTemplateProps {
    onTemplateClicked: (open: boolean) => void;
}

const NewNoteTemplate = ({ onTemplateClicked }: INoteTemplateProps) => {
    const smallScreen = useMediaQuery('(max-width:599px)');

    return (
        <StyledBox display="flex" justifyContent="center" alignItems="center" screenSize={smallScreen} onClick={() => onTemplateClicked(true)}>
            <Typography variant="h3">
                + New Note
            </Typography>
        </StyledBox>
    )
}

export default NewNoteTemplate;