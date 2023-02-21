import React from "react";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import { Button, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { Note } from "../../../../models/note";

interface SortByProps {
  notes: Note[],
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
}

const SortButton = styled(Button)(({ theme }) => ({
  padding: "0 1px 0 1px",
  minWidth: "90px",
  height: "inherit",
  ":focus-visible": {
    outline: `3px solid ${theme.palette.border.main}`,
  },
}));

const SortBy = ({ notes, setNotes }: SortByProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sortCreatedDate = (order: string, byCreated: boolean) => {
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
        <MenuItem onClick={() => sortCreatedDate("asc", true)}>Ascending (Date created)</MenuItem>
        <MenuItem onClick={() => sortCreatedDate("desc", true)}>Descending (Date created)</MenuItem>
        <MenuItem onClick={() => sortCreatedDate("asc", false)}>Ascending (Date edited)</MenuItem>
        <MenuItem onClick={() => sortCreatedDate("desc", false)}>Descending (Date edited)</MenuItem>
      </Menu>
    </>
  );
};

export default SortBy;