import React from 'react'
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const SortButton = styled(Button)(({ theme }) => ({
    padding: "0 1px 0 1px",
    minWidth: "90px",
    height: "inherit",
    ":focus-visible": {
      outline: `3px solid ${theme.palette.border.main}`,
    }
}))

const SortBy = () => {
  return (
    <SortButton
      disableRipple
      variant="outlined"
      endIcon={<SortRoundedIcon />}
    >
        Sort
    </SortButton>
  )
}

export default SortBy