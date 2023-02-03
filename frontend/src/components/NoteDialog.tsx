import React from 'react'
import { Box, Slide, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Typography, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { styled } from '@mui/system';
import { FormControl } from '@mui/material';
import { Note } from '../models/note';
import { useForm } from 'react-hook-form';
import { INoteInput } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import CloseIcon from '@mui/icons-material/Close';
import { ErrorMessage } from "@hookform/error-message";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/*const StyledDialog = styled(Dialog)(({ theme }) => ({
    animation: "tilt-in-fwd-tr 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)",

    "@keyframes tilt-in-fwd-tr": {
        "0%": {
            transform: "rotateY(20deg) rotateX(35deg) translate(300px, -300px) skew(-35deg, 10deg)",
            opacity: "0",
        },
        "100%": {
            transform: "rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg)",
            opacity: "1",
        }
    }


}));*/

const StyledBox = styled(Box)(({ theme }) => ({
    width: useMediaQuery('(max-width: 700px)') ? "270px" : "600px",
    maxHeight: "600px",
}));

interface IAddNoteDialogProps {
    open?: boolean,
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
}

const NoteDialog = ({ open = true, noteToEdit, onDismiss, onNoteSaved }: IAddNoteDialogProps) => {
    const theme = useTheme();
    //const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<INoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    });

    async function onSubmit(input: INoteInput) {
        try {
            let noteResponse: Note;
            if (noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            } else {
                noteResponse = await NotesApi.createNote(input);
            }

            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Dialog
            //fullScreen={fullScreen}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => console.log("testas")}
            aria-describedby="alert-dialog-slide-description"
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
            }}
        >
            <StyledBox>
                <DialogTitle display="flex" justifyContent="space-between" variant="h3">
                    {noteToEdit ? "Edit note" : "Add note"}
                    <IconButton sx={{ margin: "-15px -20px 0px 0px" }} onClick={onDismiss}>
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <FormControl variant="standard" fullWidth>
                            <Typography variant="h5">Title</Typography>
                            <TextField inputProps={{ maxLength: 50 }} error={!!errors.title} placeholder="Title" size="small" {...register("title", { required: "Required" })} />
                            <ErrorMessage
                                errors={errors}
                                name="title"
                                render={({ message }) => <p style={{ color: theme.palette.error.main, fontWeight: 500 }}>{message}</p>}
                            />
                            <Typography variant="h5" pt="1rem">Text</Typography>
                            <TextField inputProps={{ maxLength: 100000 }} rows={16} multiline placeholder="Type text here..." {...register("text")} />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            {noteToEdit ? "SAVE CHANGES" : "CREATE NOTE"}
                        </Button>
                    </DialogActions>
                </form>
            </StyledBox>
        </Dialog>
    )
}

export default NoteDialog