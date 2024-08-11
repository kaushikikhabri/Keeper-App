import React from "react";

function Note(props) {
    const isEditing = props.editMode === props.id;

    return (
        <div className="note">
            {isEditing ? (
                <div>
                    <input type="text" name="title" placeholder="Title" value={props.title} onChange={(event) => props.onEditChange(event, props.id)} /> 
                    <textarea name="content" placeholder="Add note here..." value={props.content} onChange={(event) => props.onEditChange(event, props.id)} ></textarea>
                    <button onClick={() => props.save(props.id, { title: props.title, content: props.content })}>SAVE</button>
                </div>
            ) : (
                <div>
                    <h1>{props.title}</h1>
                    <p>{props.content}</p>
                    <button onClick={() => props.delete(props.id)}>DELETE</button>
                    <button onClick={() => props.edit(props.id)}>EDIT</button>
                </div>
            )}
        </div>
    );
}

export default Note;
