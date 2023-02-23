import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";

const StyledButtons = styled(ButtonGroup)(({ theme }) => ({
  "& .MuiButton-root:focus-visible": {
    outline: `3px solid ${theme.palette.border.main}`,
  }
}));

const CategoryButtonMobile = () => {
  return (
    <StyledButtons
      disableRipple
      size="small"
      sx={{ height: "37px" }}
    >
      <Button variant="outlined">Hello <ArrowDropDownIcon /></Button>
      <Button variant="outlined" sx={{ padding: 0 }}>
        <AddIcon fontSize="small" />
      </Button>
    </StyledButtons>
  );
};

export default CategoryButtonMobile;