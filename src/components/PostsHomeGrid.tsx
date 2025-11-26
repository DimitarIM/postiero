'use client'

import { usePostStore } from '@/store/usePostStore'
import React, { useEffect, useState, useMemo } from 'react'
import PostMinimized from './PostMinimized';

function PostsHomeGrid() {
  const [searchQuery, setSearchQuery] = useState('');

  const { fetchPosts, posts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [])

  const postsFiltered = useMemo(() => {
    if(!searchQuery) {
      return posts;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    return posts.filter(post => post.title.toLowerCase().includes(lowerCaseQuery));
  }, [posts, searchQuery])

  return (
    <div className='w-full max-w-[700px] h-full p-20 pt-12'>
      
      <input
        type="text"
        placeholder="Search posts by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded-md text-white"
      />
      
      <div className='grid grid-cols-1 auto-rows-min gap-6 w-full'>
        {
          postsFiltered.map((post, index) => (
            <PostMinimized key={index} postInfo={post}/>
          ))
        }
        {
          postsFiltered.length === 0 && searchQuery.length > 0 && (
             <p className="text-center text-gray-500 mt-4">No posts found.</p>
          )
        }
      </div>
    </div>

  )
}

export default PostsHomeGrid