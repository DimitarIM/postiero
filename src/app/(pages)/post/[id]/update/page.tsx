'use client'

import PostUpdateForm from '@/components/forms/PostUpdateForm'
import { usePostStore } from '@/store/usePostStore';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function Update() {

    const { selectedPost, fetchPost, loading } = usePostStore();
    const params = useParams();

    useEffect(() => {
        fetchPost(params.id as string);
    },[]);
    return (
        <div className='pt-[70px] min-h-screen justify-center'>
            {
                selectedPost &&<PostUpdateForm  post={selectedPost}/>
            }
        </div>

    )
}

export default Update