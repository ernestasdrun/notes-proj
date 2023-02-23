import { Note } from "../models/note";
import { fetchData } from "./fetchData";

export interface INoteInput {
    title: string,
    text?: string,
    category: string,
}

export async function fetchNotes(token: string): Promise<Note[]> {
    const response = await fetchData(`http://localhost:5001/api/notes`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return response.json();
}

export async function createNote(note: INoteInput, token: string): Promise<Note> {
    const response = await fetchData(`http://localhost:5001/api/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(note),
    });
    return response.json();
}

export async function updateNote(noteId: string, note: INoteInput, token: string): Promise<Note> {
    const response = await fetchData(`http://localhost:5001/api/notes/` + noteId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(note),
    });
    return response.json();
}

export async function deleteNote(noteId: string, token: string) {
    await fetchData(`http://localhost:5001/api/notes/` + noteId, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
}