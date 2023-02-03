import { Note } from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMesage = errorBody.error;
        throw Error(errorMesage);
    }
}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData('http://localhost:5001/api/notes', { method: "GET" });
    return response.json();
}

export interface INoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: INoteInput): Promise<Note> {
    const response = await fetchData('http://localhost:5001/api/notes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response.json();
}

export async function updateNote(noteId: string, note: INoteInput): Promise<Note> {
    const response = await fetchData('http://localhost:5001/api/notes/' + noteId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response.json();
}

export async function deleteNote(noteId: string) {
    await fetchData('http://localhost:5001/api/notes/' + noteId, { method: "DELETE" });
}