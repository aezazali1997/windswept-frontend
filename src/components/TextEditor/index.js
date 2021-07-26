import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ notes, handleNotes }) => {

    return (
        <Editor
            editorState={notes}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="input"
            onEditorStateChange={handleNotes}
        />
    )
}

export default TextEditor;
