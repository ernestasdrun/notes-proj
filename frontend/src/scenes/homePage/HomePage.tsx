import React, { useEffect, useState } from 'react';
import { Note } from '../../models/note';
import NoteComponent from '../../components/Note';
import Box from '@mui/material/Box';
import { Fab, Grid, useMediaQuery } from '@mui/material';
import * as NotesApi from '../../network/notes_api';
import NoteDialog from '../../components/NoteDialog';
import { Note as NoteModel } from '../../models/note';
import Navbar from '../../components/Navbar';
import NewNoteTemplate from '../../components/NewNoteTemplate';
import LoadingState from '../../components/LoadingState';
import AddIcon from '@mui/icons-material/Add';

const HomePage = () => {

  const smallScreen = useMediaQuery('(max-width:600px)');

  const [notes, setNotes] = useState<Note[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showNoteDialog, setAddNoteDialog] = useState(false);
  const [noteEdit, setNoteEdit] = useState<NoteModel | null>();

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  }

  const notesGrid =
    <Grid
      container
      alignContent="center"
      spacing={5}
      direction={smallScreen ? "column" : "row"}
    >
      {notes.slice().reverse().map((note, index) => (
        <React.Fragment key={index}>
          {
            index == 0 && !smallScreen &&
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
              <NewNoteTemplate onTemplateClicked={setAddNoteDialog}/>
            </Grid>
          }
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={note._id}>
            <NoteComponent note={note} onNoteClicked={setNoteEdit} onDeleteNote={deleteNote} key={note._id} />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>

  return (
    <Box>
      <Navbar />
      <Box m={{ xs: "8rem 1rem 2rem 1rem", sm: "8rem 2rem 2rem 2rem", md: "8rem 3rem 2rem 3rem", lg: "8rem 8rem 2rem 8rem", xl: "8rem 10rem 2rem 10rem" }}>
        {notesLoading && <LoadingState />}
        {showNotesLoadingError && <p>Something went wrong. Please refresh the page.</p>}
        {!notesLoading && !showNotesLoadingError &&
          <>
            {notes.length > 0
              ? notesGrid
              : <p>{"You don't have notes yet"}</p>
            }
          </>
        }
        {showNoteDialog &&
          <NoteDialog
            open={showNoteDialog}
            onDismiss={() => setAddNoteDialog(false)}
            onNoteSaved={(newNote) => {
              setNotes([...notes, newNote]);
              setAddNoteDialog(false);
            }}
          />
        }
        {noteEdit &&
          <NoteDialog
            noteToEdit={noteEdit}
            onDismiss={() => setNoteEdit(null)}
            onNoteSaved={(updatedNote) => {
              setNotes(notes.map(existNote => existNote._id === updatedNote._id ? updatedNote : existNote));
              setNoteEdit(null);
            }}
          />
        }
      </Box>
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
  )
}

export default HomePage