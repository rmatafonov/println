import React, { FC, useEffect, useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './text-editor.css'
import draftToHtml from 'draftjs-to-html'
import { Props } from './types'

const TextEditor: FC<Props> = (({ setEditorText, isEmptyTriggered }) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  useEffect(() => {
    setEditorState(EditorState.createEmpty())
  }, [isEmptyTriggered])

  const onEditorStateChange = (newState: React.SetStateAction<EditorState>) => {
    setEditorState(newState)
    setEditorText(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <div className="text-editor">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        editorClassName="text-editor__input"
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list'],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
        }}
      />
    </div>
  );
})
export default TextEditor;
