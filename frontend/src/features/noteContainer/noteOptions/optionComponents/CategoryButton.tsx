import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';

const StyledButtons = styled(ButtonGroup)(({ theme }) => ({
  "& .MuiButton-root:focus-visible": {
    outline: `3px solid ${theme.palette.border.main}`,
  }
}))

const CategoryButton = () => {
  return (
    <StyledButtons
      disableRipple
      size="small"
      sx={{ height: "inherit" }}
    >
      <Button variant="outlined">Hello <ArrowDropDownIcon /></Button>
      <Button variant="outlined" sx={{ padding: 0 }}>
        <AddIcon fontSize="small" />
      </Button>
    </StyledButtons>
  )
}

export default CategoryButton