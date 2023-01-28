import React, { FC, useEffect, useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './text-editor.css'
import draftToHtml from 'draftjs-to-html'
import { Props } from './types'
import { isServer } from '@/utils/isServer'

// @ts-ignore
let Editor
if (!isServer) {
  import('react-draft-wysiwyg').then((mod) => {
    Editor = mod.Editor
  })
}

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
          inline: {
            options: ['bold', 'italic']
          },
          blockType: {
            options: [
              'Normal',
              'H2',
              'H3',
              'H4',
              'H5',
              'H6',
            ],
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36],
          },
          list: {
            options: ['unordered', 'ordered'],
          },
        }}
      />
    </div>
  );
})
export default TextEditor;
