import React from 'react'
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const SortButton = styled(Button)(({ theme }) => ({
    padding: "0 1px 0 1px",
    minWidth: "90px",
    height: "inherit",
}))

const SortBy = () => {
  return (
    <SortButton variant="outlined" endIcon={<SortRoundedIcon />}>
        Sort
    </SortButton>
  )
}

export default SortBy