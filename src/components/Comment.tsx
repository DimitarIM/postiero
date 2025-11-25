'use client'

import { CommentType } from '@/types/types'
import React, { useEffect, useState } from 'react'
import CommentForm from './forms/CommentForm'
import { useCommentStore } from '@/store/useCommentStore';

function Comment({ commentInfo, commentId }: { commentInfo: CommentType, commentId: string }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [replies, setReplies] = useState<CommentType[]>([]);
  const { fetchReplies } = useCommentStore();

  async function loadReplies() {
    const data = await fetchReplies(commentId);
    setReplies(data || []);
  }

  useEffect(() => {

    loadReplies();
  }, [commentId])

  return (
    <div className={`flex flex-col gap-2 pl-8`}>
      <div className='flex gap-2 items-center'>
        <h2 className='font-bold'>{commentInfo.username}</h2>
        <div dangerouslySetInnerHTML={{ __html: commentInfo.content }} />
      </div>
      {
        !isExpanded && <button className='bg-blue-900 p-1 rounded-[4px] cursor-pointer w-[70px] text-[14px]'
          onClick={() => isExpanded ? setIsExpanded(false) : setIsExpanded(true)}>Reply</button>
      }
      {
        isExpanded && <CommentForm setIsExpanded={setIsExpanded} loadReplies={loadReplies} parentId={commentId} level={commentInfo.level++}/>
      }
      <div className='flex flex-col gap-3'>
        {
          replies.length > 0 ? replies.map((reply, index) => (
            <Comment commentInfo={reply} commentId={reply.id} key={index} />
          ))
            : null
        }
      </div>
    </div>

  )
}

export default Comment