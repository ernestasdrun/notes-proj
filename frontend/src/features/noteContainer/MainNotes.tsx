import React, { useEffect, useState } from "react";
import { Note } from "../../models/note";
import NoteComponent from "./notes/Note";
import { Fab, Grid, Box, useMediaQuery } from "@mui/material";
import * as NotesApi from "../../network/notes_api";
import NoteDialog from "./editDialog/NoteDialog";
import { Note as NoteModel } from "../../models/note";
import NewNoteTemplate from "./notes/NewNoteTemplate";
import LoadingState from "../../components/loading/LoadingState";
import AddIcon from "@mui/icons-material/Add";
import Footer from "../footer/Footer";
import { useAppSelector } from "../../app/hooks";
import { IUser } from "../auth/authSlice";
import { Group } from "../../models/group";

interface MainNotesProps {
  notes: Note[],
  originalNotes: Note[],
  searchValue: string,
  currentContent?: Group,
  categoryContainer: IUser | Group,
  categoryAlignment: string,
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  setOriginalNotes: React.Dispatch<React.SetStateAction<Note[]>>,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  setCategoryContainer: React.Dispatch<React.SetStateAction<IUser | Group>>
  ,
}

const MainNotes = ({ notes, originalNotes, searchValue, currentContent, categoryContainer, categoryAlignment, setNotes, setOriginalNotes, setSearchValue, setCategoryContainer }: MainNotesProps) => {
  const user = useAppSelector((state) => state.auth.user) as IUser;

  const smallScreen = useMediaQuery('(max-width:600px)');

  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showNoteDialog, setAddNoteDialog] = useState(false);
  const [noteEdit, setNoteEdit] = useState<NoteModel | null>();

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        let notes: Note[] | null = null;
        if (currentContent) {
          notes = await NotesApi.fetchNotes(user.token, currentContent._id);
        } else {
          notes = await NotesApi.fetchNotes(user.token);
        }
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, [currentContent]);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id, user.token, currentContent?._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  }

  const notesGrid = (
    <Grid
      container
      alignContent="center"
      spacing={5}
      direction={smallScreen ? "column" : "row"}
    >
      {!smallScreen &&
        <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
          <NewNoteTemplate onTemplateClicked={setAddNoteDialog} />
        </Grid>
      }
      {notes.slice().reverse().map((note, index) => (
        note.title.includes(searchValue) &&
        <React.Fragment key={index}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={note._id}>
            <NoteComponent note={note} onNoteClicked={setNoteEdit} onDeleteNote={deleteNote} key={note._id} />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );

  return (
    <Box maxHeight="100%" sx={{ overflowY: "hidden", ":hover": { overflowY: "auto" } }}>
      <Box
        m={{
          xs: "1rem",
          sm: "1rem 2rem 2rem 2rem",
          md: "1rem 4rem 2rem 4rem",
        }}>
        {notesLoading && <LoadingState />}
        {showNotesLoadingError && <p>Something went wrong. Please refresh the page.</p>}
        {!notesLoading && !showNotesLoadingError && notesGrid}
        {showNoteDialog &&
          <NoteDialog
            categoryContainer={categoryContainer}
            open={showNoteDialog}
            onDismiss={() => setAddNoteDialog(false)}
            onNoteSaved={(newNote) => {
              if (categoryAlignment === newNote.category || "All" === newNote.category) {
                setNotes([...notes, newNote]);
              }
              setOriginalNotes([...originalNotes, newNote]);
              setAddNoteDialog(false);
            }}
          />
        }
        {noteEdit &&
          <NoteDialog
            categoryContainer={categoryContainer}
            noteToEdit={noteEdit}
            onDismiss={() => setNoteEdit(null)}
            onNoteSaved={(updatedNote) => {
              if (categoryAlignment === updatedNote.category || "All" === updatedNote.category) {
                setNotes(notes.map(existNote => existNote._id === updatedNote._id ? updatedNote : existNote));
              }
              setOriginalNotes(originalNotes.map(existNote => existNote._id === updatedNote._id ? updatedNote : existNote));
              setNoteEdit(null);
            }}
          />
        }
      </Box>
      {smallScreen && <Footer />}
      {smallScreen &&
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setAddNoteDialog(true)}
          sx={{ position: "fixed", right: 20, bottom: 20, }}>
          <AddIcon />
        </Fab>
      }
    </Box>
  );
};

export default MainNotes;