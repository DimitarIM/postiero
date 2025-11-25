import { usePostStore } from '@/store/usePostStore';
import React, { useEffect } from 'react'
import PostMinimized from './PostMinimized';

function PostsRecentGrid() {
    const { fetchRecentPosts, posts } = usePostStore();

    useEffect(() => {
        fetchRecentPosts();
    }, [])

    return (
        <div className='grid grid-cols-1 auto-rows-min gap-6 w-full max-w-[1500px] h-full p-20 pt-12'>
            {
                posts.map((post, index) => (
                    <PostMinimized key={index} postInfo={post}/>
                ))
            }
        </div>

    )
}

export default PostsRecentGrid