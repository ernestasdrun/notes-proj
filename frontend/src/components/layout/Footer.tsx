import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/system';

const StyledFooter = styled(Box)<BoxProps>(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    filter: "brightness(80%)",
    height: "60px",
    alignItems: "center",
    justifyContent: "center",
}))

const Footer = () => {
  return (
    <StyledFooter display="flex">
        <p>Copyright 2023</p>
    </StyledFooter>
  )
}

export default Footer