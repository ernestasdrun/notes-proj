import React, { useEffect } from "react";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import { Button, ListItemText, Menu, MenuItem, Radio } from "@mui/material";
import { styled } from "@mui/system";
import { Note } from "../../../../models/note";
import { Group } from "../../../../models/group";

interface SortByProps {
  notes: Note[],
  originalNotes: Note[],
  currentContent: Group | null | undefined,
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  setOriginalNotes: React.Dispatch<React.SetStateAction<Note[]>>,
}

const SortButton = styled(Button)(({ theme }) => ({
  padding: "0 1px 0 1px",
  minWidth: "90px",
  height: "37px",
  ":focus-visible": {
    outline: `3px solid ${theme.palette.border.main}`,
  },
}));

const SortBy = ({ notes, originalNotes, currentContent, setNotes, setOriginalNotes }: SortByProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [selectedValue, setSelectedValue] = React.useState("createdDesc");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setSelectedValue("createdDesc");
  }, [currentContent])
  

  const sortCreatedDate = (value: string, order: string, byCreated: boolean) => {
    const sortedNotes = [...notes].sort((a: Note, b: Note) => {
      const dateA = new Date(byCreated ? a.createdAt : a.updatedAt).getTime();
      const dateB = new Date(byCreated ? b.createdAt : b.updatedAt).getTime();

      if (order === "desc") {
        return dateB < dateA ? 1 : -1;
      } else if (order === "asc") {
        return dateB > dateA ? 1 : -1;
      } else {
        return 0;
      }
    });

    setNotes(sortedNotes)

    const sortedOriginalNotes = [...originalNotes].sort((a: Note, b: Note) => {
      const dateA = new Date(byCreated ? a.createdAt : a.updatedAt).getTime();
      const dateB = new Date(byCreated ? b.createdAt : b.updatedAt).getTime();

      if (order === "desc") {
        return dateB < dateA ? 1 : -1;
      } else if (order === "asc") {
        return dateB > dateA ? 1 : -1;
      } else {
        return 0;
      }
    });

    setSelectedValue(value);
    setOriginalNotes(sortedOriginalNotes)
    handleClose();
  };

  return (
    <>
      <SortButton
        disableRipple
        variant="outlined"
        endIcon={<SortRoundedIcon />}
        onClick={handleClick}
      >
        Sort
      </SortButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => sortCreatedDate("createdAsc", "asc", true)} sx={{paddingRight: "5px", borderBottom: "1px solid #808080"}}>
          <ListItemText>Ascending (Date created)</ListItemText>
          <Radio
            checked={selectedValue === "createdAsc"}
            value="createdAsc"
            name="radio-buttons"
            inputProps={{ "aria-label": "created ascending" }} />
        </MenuItem>
        <MenuItem onClick={() => sortCreatedDate("createdDesc", "desc", true)} sx={{paddingRight: "5px", borderBottom: "1px solid #808080"}}>
          <ListItemText>Descending (Date created)</ListItemText>
          <Radio
            checked={selectedValue === "createdDesc"}
            value="createdDesc"
            name="radio-buttons"
            inputProps={{ "aria-label": "created descending" }} />
        </MenuItem>
        <MenuItem onClick={() => sortCreatedDate("editedAsc", "asc", false)} sx={{paddingRight: "5px", borderBottom: "1px solid #808080"}}>
          <ListItemText>Ascending (Date edited)</ListItemText>
          <Radio
            checked={selectedValue === "editedAsc"}
            value="editedAsc"
            name="radio-buttons"
            inputProps={{ "aria-label": "edited ascending" }} />
        </MenuItem>
        <MenuItem onClick={() => sortCreatedDate("editedDesc", "desc", false)} sx={{paddingRight: "5px"}}>
          <ListItemText>Descending (Date edited)</ListItemText>
          <Radio
            checked={selectedValue === "editedDesc"}
            value="editedDesc"
            name="radio-buttons"
            inputProps={{ "aria-label": "edited descending" }} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default SortBy;