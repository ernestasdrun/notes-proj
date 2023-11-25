import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { NavigateFunction } from "react-router-dom";

interface NavbarButtonProps {
  text: string,
  textVariant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | "inherit" | undefined,
  link: string,
  navigate: NavigateFunction;
  [x: string]: unknown,
}

const ButtonContainer = styled(Box)(({ theme }) => ({
  borderRadius: "5px",
  border: `3px solid ${theme.palette.customButton.dark}`,
  transition: "background-color",
  transitionDuration: "200ms",
  boxShadow: "0px 0px 8px 0px #1d1d1d",
  ":hover": {
    backgroundColor: theme.palette.customButton.light,
    cursor: "pointer"
  },
  ":focus-visible": {
    backgroundColor: theme.palette.customButton.light,
    outline: `3px solid ${theme.palette.border.main}`,
  },
  "& .MuiTypography-root": {
    userSelect: "none",
    color: theme.palette.text.primary,
    fontWeight: "500",
  },
}));

const NavbarButton = ({ text, textVariant, link, navigate, ...props }: NavbarButtonProps) => {
  return (
    <ButtonContainer
      {...props}
      tabIndex={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={() => navigate(link)}
    >
      <Typography variant={textVariant}>{text}</Typography>
    </ButtonContainer>
  );
};

export default NavbarButton;