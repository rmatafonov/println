import React, { useCallback } from 'react'
import { EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './text-editor.css'

function TextEditor() {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  const onEditorStateChange = useCallback((newState: React.SetStateAction<EditorState>) => {
    console.log(newState)
    setEditorState(newState)
  }, [])

  return (
    <div className="text-editor">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </div>
  );
}
export default TextEditor;
