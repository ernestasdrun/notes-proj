import React from 'react';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  title: string,
  to: string,
  text: string,
}

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.secondary.light : theme.palette.secondary.dark,
  fontWeight: "bold",
  textDecoration: "none",
  borderRadius: "5px",
  ":hover": {
    filter: "brightness(130%)",
  },
  ":focus-visible": {
    outline: `3px solid ${theme.palette.border.main}`,
  },
}));

const NavigationLink = ({ title, to, text, ...props }: NavLinkProps) => {
  return (
    <StyledLink
      {...props}
      aria-label={title}
      to={to}
    >
      {text}
    </StyledLink>
  );
};

export default NavigationLink;