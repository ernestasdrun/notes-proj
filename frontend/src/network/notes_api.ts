import { Note } from "../models/note";
import { fetchData } from "./fetchData";

export interface INoteInput {
    title: string,
    text?: string,
    category: string,
}

export async function fetchNotes(token: string, groupId?: string): Promise<Note[]> {
    const response = await fetchData(`http://localhost:5001/api/notes/all`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({groupId: groupId}),
    });
    return response.json();
}

export async function createNote(note: INoteInput, token: string, groupId?: string): Promise<Note> {
    const response = await fetchData(`http://localhost:5001/api/notes/${groupId ? groupId : ""}`, {
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

export async function deleteNote(noteId: string, token: string, groupId?: string) {
    await fetchData(`http://localhost:5001/api/notes/` + noteId + `/${groupId ? groupId : ""}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
}