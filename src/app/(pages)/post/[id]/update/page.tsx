'use client'

import PostUpdateForm from '@/components/forms/PostUpdateForm'
import { usePostStore } from '@/store/usePostStore';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function Update() {

    const { selectedPost, fetchPost } = usePostStore();
    const params = useParams();

    useEffect(() => {
        fetchPost(params.id as string);
    },[]);
    return (
        <div className='pt-[70px] min-h-screen'>
            <PostUpdateForm  post={selectedPost!}/>
        </div>

    )
}

export default Update