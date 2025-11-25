'use client'

import { useRouter } from 'next/navigation'
import { usePostStore } from '@/store/usePostStore'
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import CommentForm from '@/components/forms/CommentForm';
import { useCommentStore } from '@/store/useCommentStore';
import Comment from '@/components/Comment';
import { useSessionContext } from '@/context/sessionContext';

function Post() {
  const { selectedPost, fetchPost, deletePost } = usePostStore();
  const {comments, fetchComments} = useCommentStore();
  const { userInfo, sessionIsActive } = useSessionContext();

  const { id } = useParams();
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  useEffect(() => {
    fetchPost(id as string);
    fetchComments();
  }, [])

  return (
    <div className='flex flex-col justify-center text-white min-h-screen pt-[70px] pr-[20%] pl-[20%] gap-10'>
      {/* Post */}
      <div className='flex flex-col justify-center items-center gap-5'>

        <h1>{selectedPost?.title}</h1>
        {
          selectedPost?.upload_url ? <img className='w-160 h-120' src={selectedPost.upload_url}></img> : null
        }
        {selectedPost?.content && (
          <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
        )}
      {
       userInfo?.user_id === selectedPost?.user_id && sessionIsActive
       ?
      <div className='flex gap-10'>
        <button className='bg-red-500 p-2 rounded-[4px] cursor-pointer' onClick={()=> {
          deletePost(selectedPost!.id);
          router.push('/')
        }}>
        Delete Post
        </button>
        <button className='bg-blue-700 p-2 rounded-[4px] cursor-pointer' onClick={
        ()=> {
          router.push(`/post/${selectedPost!.id}/update`);
          }}>
          Update Post
        </button>
      </div>
      : null
      }
      </div>
      {/* Comments */}
      <div className={`flex justify-start p-10`}>
        <div className='flex flex-col gap-6'>
          {
            !isExpanded && sessionIsActive && <button className='bg-blue-900 p-2 rounded-[4px] cursor-pointer w-[150px]'
              onClick={() => isExpanded ? setIsExpanded(false) : setIsExpanded(true)}>Make a comment</button>
          }
          {
            isExpanded && <CommentForm setIsExpanded={setIsExpanded} parentId={null} level={0}/>
          }
          <div className='flex flex-col gap-3'>
            {
              comments.filter(c=>c.parent_id===null).map((comment, index) => (
                <Comment commentInfo={comment} commentId = {comment.id} key={index} />
              ))
            }
          </div>

        </div>

      </div>
    </div>
  )
}

export default Post