export type PostType = {
    id: string,
    title: string,
    user_id: string,
    upload_url?: string,
    content: string,
    categories: string[],
    createdAt: string,
}

export type CommentType = {
    id: string,
    user_id: string,
    post_id: string,
    parent_id: string,
    level: number,
    username: string,
    content: string,
    createdAt: string,
}


export type ProfileType = {
    user_id: string,
    username: string,
    email:string,
    avatar_url?: string,
    bio?: string,
}

export type Upload = {
    id: string,
    name: string,
    url: string,
    file_type: string,
}