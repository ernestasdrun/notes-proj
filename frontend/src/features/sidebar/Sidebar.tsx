import React, { useEffect, useState } from "react";
import { Avatar, Box, Dialog, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import GroupsIcon from '@mui/icons-material/Groups';
import { styled } from "@mui/system";
import { useAppSelector } from "../../app/hooks";
import { IUser } from "../auth/authSlice";
import * as GroupsApi from "../../network/groups_api";
import { Group } from "../../models/group";
import AddIcon from "@mui/icons-material/Add";
import SmallDialog from "./SmallDialog";

interface SidebarProps {
    currentContent: Group | null,
    setCurrentContent: React.Dispatch<React.SetStateAction<Group | null>>,
}

const StyledListButton = styled(ListItemButton)(({ theme }) => ({
    "&.MuiButtonBase-root": {
        backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "#cbe0c4",
        "&.Mui-selected": {
            backgroundColor: theme.palette.mode === "dark" ? "#202020" : "#b2d8a6",
            borderLeft: `3px solid ${theme.palette.border.colored}`,
            borderRadius: "5px 0 0 5px",
            paddingLeft: "13px",
        },
        ":hover": {
            backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#97c28a",
        },
    },
}));

const Sidebar = ({ currentContent, setCurrentContent }: SidebarProps) => {
    const user = useAppSelector((state) => state.auth.user) as IUser;

    const [groups, setGroups] = useState<Group[]>([]);

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const [groupsLoading, setGroupsLoading] = useState(true);
    const [showGroupsLoadingError, setShowGroupsLoadingError] = useState(false);

    const [showGroupDialog, setGroupDialog] = useState(false);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        async function loadGroups() {
            try {
                setShowGroupsLoadingError(false);
                setGroupsLoading(true);
                const groups = await GroupsApi.fetchGroups(user.token);
                setGroups(groups);
            } catch (error) {
                console.error(error);
                setShowGroupsLoadingError(true);
            } finally {
                setGroupsLoading(false);
            }
        }
        loadGroups();
    }, [])

    async function loadGroup(groups: Group) {
        try {
            setShowGroupsLoadingError(false);
            setGroupsLoading(true);
            const group = await GroupsApi.fetchGroup(groups._id, user.token);
            setCurrentContent(group);
        } catch (error) {
            console.error(error);
            setShowGroupsLoadingError(true);
        } finally {
            setGroupsLoading(false);
        }
    }

    return (
        <Box maxHeight="100%" display="flex" flexDirection="column">
            {showGroupDialog &&
                <SmallDialog
                    open={showGroupDialog}
                    onDismiss={() => setGroupDialog(false)}
                    onGroupSaved={(newGroup) => {
                        setGroups([...groups, newGroup]);
                        setGroupDialog(false);
                    }}
                />
            }
            <List sx={{ p: "2px 0 0 0" }}>
                <StyledListButton
                    disableRipple
                    divider
                    selected={selectedIndex === 0}
                    onClick={(event) => { handleListItemClick(event, 0); setCurrentContent(null); }}
                >
                    <ListItemIcon>
                        <StickyNote2Icon />
                    </ListItemIcon>
                    <ListItemText primary="My Notes" />
                </StyledListButton>

                <StyledListButton
                    disableRipple
                    divider
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemIcon>
                        <GroupsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Groups" />
                </StyledListButton>

            </List>
            <Box sx={{ maxHeight: "100%", overflowY: "hidden", ":hover": { overflowY: "auto" } }}>
                <List dense disablePadding subheader={<ListSubheader>Groups</ListSubheader>}>
                    <StyledListButton
                        disableRipple
                        divider
                        onClick={() => setGroupDialog(true)}
                    >
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create group" />
                    </StyledListButton>
                    {groups.map((group, index) =>
                        <StyledListButton
                            key={group._id}
                            disableRipple
                            divider
                            selected={selectedIndex === 2 + index}
                            onClick={(event) => { handleListItemClick(event, 2 + index); loadGroup(group); }}
                        >
                            <ListItemAvatar>
                                <Avatar alt={group.name} src="/" sx={{ width: 30, height: 30 }} />
                            </ListItemAvatar>
                            <ListItemText primary={group.name} />
                        </StyledListButton>)}
                </List>
            </Box>

        </Box>
    );
};

export default Sidebar;