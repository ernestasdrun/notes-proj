import React from 'react';
import { Typography, Box, useMediaQuery } from '@mui/material';
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
    transition: "box-shadow, transform, background",
    transitionDuration: "350ms",
    transitionTimingFunction: "ease",
    ":focus-visible": {
        outline: `5px solid ${theme.palette.secondary.main}`,
        outlineOffset: "3px",
        background: "rgba(0, 0, 0, 0.2)",
        transform: "translateY(-8px)",
        boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.2)",
    },
    ":hover": {
        background: "rgba(0, 0, 0, 0.2)",
        transform: "translateY(-8px)",
        boxShadow: "0px 8px 10px 1px rgba(0, 0, 0, 0.2)",
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
        <StyledBox tabIndex={0} display="flex" justifyContent="center" alignItems="center" screenSize={smallScreen} onClick={() => onTemplateClicked(true)}>
            <Typography variant="h3">
                + New Note
            </Typography>
        </StyledBox>
    )
}

export default NewNoteTemplate;