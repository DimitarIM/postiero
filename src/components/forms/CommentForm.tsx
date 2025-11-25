'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { CommentFormSchema } from './formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Loader2 } from 'lucide-react';
import TextEditor from '../text-editor/TextEditor';
import { useCommentStore } from '@/store/useCommentStore';
import { useParams } from 'next/navigation';

function CommentForm({ setIsExpanded, loadReplies, parentId, level }: { 
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>,
  loadReplies?: () => void,
  parentId: string | null,
  level: number
  }) {

  const { loading, fetchComments, addComment, setFormData } = useCommentStore();
  const [editorContent, setEditorContent] = useState<string>("");

  const editorRef = React.useRef<any>(null);

  const { id } = useParams();

  const { handleSubmit, setValue } = useForm<z.infer<typeof CommentFormSchema>>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      post_id: "",
      parent_id: null,
      content: "",
      level: 0
    },
  })

  useEffect(() => {
    setValue("post_id", id as string);
    setValue("parent_id", parentId);
    setValue("level", level);
  }, []);

  useEffect(() => {
    setValue("content", editorContent);
  }, [editorContent, setValue]);

  async function onCommentSubmit(values: z.infer<typeof CommentFormSchema>) {
    setFormData({
      post_id: values.post_id,
      parent_id: values.parent_id,
      content: values.content,
      level: values.level
    });
    setEditorContent("");
    if (editorRef.current) {
      editorRef.current.commands.setContent("");
    }
    await addComment();
    setIsExpanded(false);
    fetchComments();
    if(loadReplies) loadReplies();
  }
  return (
    <div className='z-2 flex flex-col bg-foreground text-accent rounded-[10px] justify-center items-center'>
      <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onCommentSubmit, (errors) => console.log(errors))}>
        <TextEditor content={editorContent} onChange={setEditorContent} editorRef={editorRef} />
        <div className="relative flex justify-between">
          <button className='flex justify-center items-center bg-detail text-accent cursor-pointer h-6 min-w-60'
            onClick={() => setIsExpanded(false)}>
            {
              "Back"
            }
          </button>
          <button type='submit' className='flex justify-center items-center bg-detail text-accent cursor-pointer h-6 min-w-60'>
            {
              loading ? <Loader2 className="size-4 animate-spin" />
                : "Submit"
            }
          </button>
        </div>
      </form>
    </div>

  )
}
export default CommentForm;