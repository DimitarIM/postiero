'use client'

import { PostType } from '@/types/types'
import React from 'react'

function PostMinimized({postInfo}:{postInfo:PostType}) {
  return (
    <a href={`/post/${postInfo.id}`}>
      <div className='flex flex-col text-white'>
      <h2>{postInfo.title}</h2>
      {
        postInfo.upload_url ? <img className='w-full max-h-96 object-contain' src={postInfo.upload_url}></img> : null
      }
    </div>
    </a>
    
  )
}

export default PostMinimized