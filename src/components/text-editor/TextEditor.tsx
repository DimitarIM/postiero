'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align';
import React, { useEffect } from 'react'
import MenuBar from './MenuBar'

function TextEditor({content, onChange, editorRef}:{content:string, onChange:(content:string) => void, editorRef?: any}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        }
      }),
      Underline,
      Highlight.configure({
        multicolor: true
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      })],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "w-full h-full min-w-[400px] border-1 border-accent border-t-0 p-3 min-h-[120px]",
      }
    },
    onUpdate:({editor}) => {
      onChange(editor.getHTML());
    }
  })

  useEffect(() => {
    if (editorRef) editorRef.current = editor;
  }, [editor, editorRef]);

  return (
    <div className='max-w-[700px]'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>

  )
}

export default TextEditor