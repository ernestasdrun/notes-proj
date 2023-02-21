import React from "react";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const NewCategoryButton = () => {
  return (
    <Button variant="contained" startIcon={<AddIcon />} sx={{ justifySelf: "center"}}>
        NEW
    </Button>
  );
};

export default NewCategoryButton;