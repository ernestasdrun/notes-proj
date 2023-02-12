import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

const CategoryButton = () => {
  return (
    <ButtonGroup disableRipple size="small" sx={{ height: "inherit" }}>
        <Button>Hello <ArrowDropDownIcon /></Button>
        <Button sx={{ padding: 0 }}>
            <AddIcon fontSize="small" />
        </Button>
    </ButtonGroup>
  )
}

export default CategoryButton