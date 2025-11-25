import { Editor } from '@tiptap/react'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Heading, Heading1, Heading2, Heading3, Highlighter, Italic, List, ListOrdered, MoveLeft, Strikethrough } from 'lucide-react'
import React from 'react'
import { Toggle } from '../ui/toggle'

function MenuBar({ editor }: { editor: Editor | null }) {

    if (!editor) {
        return null
    }



    const options = [
        {
            icon: <Heading1></Heading1>,
            OnClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive('heading', { level: 1 }),
        },
        {
            icon: <Heading2></Heading2>,
            OnClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive('heading', { level: 2 }),
        },
        {
            icon: <Heading3></Heading3>,
            OnClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive('heading', { level: 3 }),
        },
        {
            icon: <Bold></Bold>,
            OnClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive('bold'),
        },
        {
            icon: <Italic></Italic>,
            OnClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive('italic'),
        },
        {
            icon: <Strikethrough></Strikethrough>,
            OnClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive('strike'),
        },
        {
            icon: <Highlighter></Highlighter>,
            OnClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive('highlight'),
        },
        {
            icon: <AlignLeft></AlignLeft>,
            OnClick: () => editor.chain().focus().setTextAlign("left").run(),
            pressed: editor.isActive({ textAlign: 'left' }),
        },
        {
            icon: <AlignCenter></AlignCenter>,
            OnClick: () => editor.chain().focus().setTextAlign("center").run(),
            pressed: editor.isActive({ textAlign: 'center' }),
        },
        {
            icon: <AlignRight></AlignRight>,
            OnClick: () => editor.chain().focus().setTextAlign("right").run(),
            pressed: editor.isActive({ textAlign: 'right' }),
        },
        {
            icon: <AlignJustify></AlignJustify>,
            OnClick: () => editor.chain().focus().setTextAlign("justify").run(),
            pressed: editor.isActive({ textAlign: 'justify' }),
        },
        {
            icon: <List></List>,
            OnClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive('bulletList'),
        },
        {
            icon: <ListOrdered></ListOrdered>,
            OnClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive('orderedList'),
        },


    ]
    return (
        <div className="border-1 p-1 space-x-2 z-50">
            <div className="button-group flex flex-row gap-1">
                {
                    options.map((option, index) => (
                        <Toggle key={index} pressed={option.pressed} onPressedChange={option.OnClick}>
                            {option.icon}
                        </Toggle>
                    ))
                }
            </div>
        </div>
    )
}

export default MenuBar