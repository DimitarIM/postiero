'use client'

import { CommentType } from '@/types/types'
import React, { useEffect, useState } from 'react'
import CommentForm from './forms/CommentForm'
import { useCommentStore } from '@/store/useCommentStore';
import { useSessionContext } from '@/context/sessionContext';

function Comment({ commentInfo, commentId }: { commentInfo: CommentType, commentId: string }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { sessionIsActive, userInfo } = useSessionContext();
  const [replies, setReplies] = useState<CommentType[]>([]);
  const { fetchReplies, deleteComment } = useCommentStore();

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
      <div className='flex gap-10'>
        {
          !isExpanded && sessionIsActive && <button className='bg-blue-900 p-1 rounded-[4px] cursor-pointer w-[70px] text-[14px]'
            onClick={() => isExpanded ? setIsExpanded(false) : setIsExpanded(true)}>Reply</button>
        }
        {
          !isExpanded && sessionIsActive && userInfo?.user_id === commentInfo.user_id && <button className='bg-red-900 p-1 rounded-[4px] cursor-pointer w-[70px] text-[14px]'
            onClick={() => deleteComment(commentInfo.id)}>Delete</button>
        }
      </div>

      {
        isExpanded && <CommentForm setIsExpanded={setIsExpanded} loadReplies={loadReplies} parentId={commentId} level={commentInfo.level++} />
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