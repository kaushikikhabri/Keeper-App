import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function App() {
    const [notesArray, setNotesArray] = useState([]);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    const [editMode, setEditMode] = useState(null); // Track which note is being edited

    function addNote(event) {
        event.preventDefault(); // Prevent page refresh

        if (note.title !== "") {
            setNotesArray((prevArray) => [...prevArray, note]);
        }

        setNote({
            title: "",
            content: "",
        });
    }

    function deleteNote(id) {
        setNotesArray((prevArray) => prevArray.filter((note, index) => index !== id));
    }

    function editNote(id) {
        if (editMode === id) {
            // Save mode
            setEditMode(null);
        } else {
            // Edit mode
            setEditMode(id);
        }
    }

    function saveNote(id, updatedNote) {
        if (updatedNote.title !== "") {
            setNotesArray((prevArray) => prevArray.map((note, index) => index === id ? updatedNote : note));
            setEditMode(null);
        }
        
    }

    function onChange(event) {
        const { name, value } = event.target;
        setNote((prevNote) => ({
            ...prevNote,
            [name]: value
        }));
    }

    function onEditChange(event, id) {
        const { name, value } = event.target;
        setNotesArray((prevArray) => prevArray.map((note, index) => index === id ? { ...note, [name]: value } : note));
    }

    return (
        <div>
            <Header />
            <form onSubmit={addNote}>
                <input onChange={onChange} type="text" name="title" placeholder="Title" value={note.title} /> 
                <textarea onChange={onChange} name="content" placeholder="Add a note..." value={note.content} ></textarea>
                <button type="submit">+</button>
            </form>
            {notesArray.map((note, index) => (
                <Note
                    key={index}
                    id={index}
                    content={note.content}
                    title={note.title}
                    delete={deleteNote}
                    edit={editNote}
                    save={saveNote}
                    editMode={editMode}
                    onEditChange={onEditChange}
                />
            ))}
            <Footer />
        </div>
    );
}

export default App;
