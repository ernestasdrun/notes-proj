import React from "react";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface NewCategoryButtonProps {
  setNewCategoryDialog: React.Dispatch<React.SetStateAction<boolean>>,
}

const NewCategoryButton = ({ setNewCategoryDialog }: NewCategoryButtonProps) => {
  return (
    <Button variant="contained" onClick={() => setNewCategoryDialog(true)} startIcon={<AddIcon />} sx={{ justifySelf: "center"}}>
        NEW
    </Button>
  );
};

export default NewCategoryButton;