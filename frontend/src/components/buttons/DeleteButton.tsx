import React from 'react';
import { styled } from '@mui/system';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Note, Note as NoteModel } from '../../models/note';
import { Tooltip } from '@mui/material';

interface DeleteButtonProps {
    size?: "small" | "inherit" | "medium" | "large" | undefined,
    note: Note,
    onDeleteNote: (note: NoteModel) => void,
    [x: string]: any,
}

const StyledIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    padding: 0,
    ":hover": {
        color: theme.palette.neutral.red,
    },

    ":focus-visible": {
        outline: `3px solid ${theme.palette.border.main}`,
    },
}))



const DeleteButton = ({ size, note, onDeleteNote, ...props }: DeleteButtonProps) => {

    return (
        <Tooltip arrow disableInteractive title="Delete" placement="top" enterDelay={500}>
            <StyledIconButton
                {...props}
                disableRipple
                onKeyDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                    onDeleteNote(note);
                    e.stopPropagation();
                }}
            >
                <DeleteIcon fontSize={size} />
            </StyledIconButton>
        </Tooltip>
    );
}

export default DeleteButton;