import React, { useState } from "react"
import Header from "./Header"
import Footer from "./Footer";
import Note from "./Note"

function App() {
    const[notesArray, setNotesArray] = useState([]);
    const [note, setNote] = useState({
        title: "",
        content: ""
    })

    

    function addNote(event){
        event.preventDefault();     //to prevent refresh of entire page after clicking the button.

        setNotesArray((prevArray) => {
            console.log(prevArray);
            
            return [...prevArray, note]
        })

        setNote({
            title: "",
            content:"",
        })
    }

    function deleteNote(id){        

        setNotesArray(() => {
            return (notesArray.filter((note, index) => {
                return index !== id;
            }))
        })
    }

    function onChange(event){
        var {name, value} = event.target;
        setNote((prevNote) => {
            return {
                ...prevNote,
                [name] : value
            }       
        })
    }

    return(
        <div>
            <Header />
            <form onSubmit={addNote}>
            <input onChange={onChange} type="text" name="title" id="" placeholder="Title" value={note.title}/>
            <textarea onChange={onChange} name="content" placeholder="Add a note..." value={note.content}></textarea>
            <button onClick={addNote}>+</button>
            </form>
            {notesArray.map((note, index) => {
                return <Note key={index} id={index} content={note.content} title={note.title} delete={deleteNote} />;
            })}
              
            <Footer />
        </div>
        
    )
}

export default App;