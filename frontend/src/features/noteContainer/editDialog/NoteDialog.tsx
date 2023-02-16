import React from "react";
import { Divider, Slide, Dialog, DialogActions, DialogContent, DialogTitle, Box } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Note } from "../../../models/note";
import { useForm } from "react-hook-form";
import { INoteInput } from "../../../network/notes_api";
import * as NotesApi from "../../../network/notes_api";
import TextInputField from "../../../components/form/TextInputField";
import FormButton from "../../../components/form/FormButton";
import CloseButton from "../../../components/buttons/CloseButton";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface IAddNoteDialogProps {
    open?: boolean,
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
}

const NoteDialog = ({ open = true, noteToEdit, onDismiss, onNoteSaved }: IAddNoteDialogProps) => {

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

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.code === "Escape") {
            onDismiss();
        }
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            onKeyDown={(e) => handleKeyDown(e)}
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
            }}
            maxWidth={false}
            PaperProps={{
                sx: {
                    width: "75vw",
                    minWidth: "300px",
                }
            }}
        >
            <DialogTitle display="flex" justifyContent="space-between" variant="h3" fontWeight={500} >
                {noteToEdit ? "Edit note" : "Add note"}
                <CloseButton size="large" sx={{ margin: "-15px -20px 0px 0px" }} onClick={onDismiss} />
            </DialogTitle>
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Box display="flex" flexDirection="column">
                        <TextInputField
                            isFullWidth={true}
                            variant="outlined"
                            label="Title"
                            name="title"
                            inputProps={{ maxLength: 50 }}
                            size="small"
                            error={errors.title}
                            register={register}
                            registerOptions={{ required: "Required" }}
                            sx={{ mb: 2 }}
                        />
                        <TextInputField
                            isFullWidth={true}
                            variant="outlined"
                            label="Text"
                            name="text"
                            size="small"
                            rows={16}
                            multiline
                            inputProps={{ maxLength: 100000 }}
                            register={register}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FormButton
                        label={noteToEdit ? "SAVE CHANGES" : "CREATE NOTE"}
                        isDisabled={isSubmitting}
                    />
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default NoteDialog;