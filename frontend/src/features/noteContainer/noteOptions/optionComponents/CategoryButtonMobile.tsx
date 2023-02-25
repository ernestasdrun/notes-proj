import React from "react";
import { Button, ButtonGroup, IconButton, ListItemText, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { IUser, resetCategories } from "../../../auth/authSlice";
import { DeleteForever } from "@mui/icons-material";
import * as UserApi from "../../../../network/users_api";
import * as GroupApi from "../../../../network/groups_api";
import { Note } from "../../../../models/note";
import { Group } from "../../../../models/group";
import { User } from "../../../../models/user";
import { isGroup } from "../../../../utils/isGroup";

interface CategoryButtonMobileProps {
  value: string,
  notes: Note[],
  originalNotes: Note[],
  currentContent: Group | null | undefined,
  categoryContainer: IUser | Group,
  setCurrentContent: React.Dispatch<React.SetStateAction<Group | null>>,
  setNewCategoryDialog: React.Dispatch<React.SetStateAction<boolean>>,
  handleChangeAndFilter: (event: React.MouseEvent<HTMLElement>, newValue: string) => void,
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  setOriginalNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  setCategoryContainer: React.Dispatch<React.SetStateAction<IUser | Group>>,
}

const StyledButtons = styled(ButtonGroup)(({ theme }) => ({
  "& .MuiButton-root:focus-visible": {
    outline: `3px solid ${theme.palette.border.main}`,
  }
}));

const CategoryButtonMobile = ({ value, notes, originalNotes, currentContent, categoryContainer, setCurrentContent, setNewCategoryDialog, handleChangeAndFilter, setNotes, setOriginalNotes, setCategoryContainer }: CategoryButtonMobileProps) => {

  const user = useAppSelector((state) => state.auth.user) as IUser;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
    handleChangeAndFilter(event, newValue);
    handleClose();
  }

  const resetCategory = (note: Note): Note => {
    note.category = "All";
    return note;
  }
  
  async function deleteCategory(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, category: string) {
    event.stopPropagation();
    let newCategories: User | Group;
    try {
      if (isGroup(categoryContainer)) {
        newCategories = await GroupApi.removeCategoryFromGroup({ name: category }, categoryContainer._id, user.token);
        setCategoryContainer(newCategories as Group);
      } else {
        newCategories = await UserApi.removeCategory({ name: category }, user.token);
        dispatch(resetCategories(newCategories));
      }

      setNotes(notes.map(existNote => newCategories?.categories.includes(existNote.category) ? existNote : resetCategory(existNote)));
      setOriginalNotes(originalNotes.map(existNote => newCategories?.categories.includes(existNote.category) ? existNote : resetCategory(existNote)));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <StyledButtons
        disableRipple
        size="small"
        sx={{ height: "37px" }}
      >
        <Button variant="outlined" onClick={handleClick}>{value} {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</Button>
        <Button variant="outlined" onClick={() => setNewCategoryDialog(true)} sx={{ padding: 0 }}>
          <AddIcon fontSize="small" />
        </Button>
      </StyledButtons>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categoryContainer && categoryContainer.categories.map((category, index) => (
          <MenuItem key={index} disableRipple onClick={(e) => handleMenuItemClick(e, category)} >
            <ListItemText>{category}</ListItemText>
            {index != 0 &&
              <IconButton disableRipple onClick={(e) => deleteCategory(e, category)} sx={{ padding: "1px", marginLeft: 2, ":hover": { color: "#972323" } }}>
                <DeleteForever sx={{ fontSize: "25px" }} />
              </IconButton>
            }
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CategoryButtonMobile;