import { CommentType } from '@/types/types';
import { FormEvent } from 'react';
import { create } from 'zustand'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface FormData {
    post_id: string,
    parent_id: string | null,
    content: string,
    level: Number
}

interface CommentState {
    comments: CommentType[],
    post_id: string,
    loading: boolean,

    formData: FormData
    setFormData: (formData: FormData) => void,
    resetFormData: () => void,

    fetchComments: () => void,
    fetchReplies: (parent_id: string) => Promise<CommentType[]>,

    addComment: () => void,
    editComment: (id: string, event: FormEvent) => void,
    deleteComment: (id: string) => void,
}

export const useCommentStore = create<CommentState>((set, get) => ({
    comments: [],
    post_id: "",
    loading: false,
    formData: {
        post_id: "",
        parent_id: null,
        content: "",
        level: 0
    },
    setFormData: (formData) => set({ formData }),
    resetFormData: () => set({ formData: { post_id: "", parent_id: null, content: "", level: 0 } }),

    fetchComments: async () => {
        set({ loading: true })
        try {
            const response = await fetch(`${BASE_URL}/api/comments`);
            if (!response.ok) {
                throw new Error(`Response statue: ${response.status}`);
            }

            const { data } = await response.json();
            const commentData: CommentType[] = data;
            set({ comments: commentData, loading: false });
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    fetchReplies: async (parent_id): Promise<CommentType[]> => {
        set({ loading: true });
        try {
            const response = await fetch(`${BASE_URL}/api/comments/replies/${parent_id}`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const { data } = await response.json();
            const replyData: CommentType[] = data;
            return replyData;
        } catch (error) {
            console.error(error);
            return []; 
        } finally {
            set({ loading: false });
        }
    },
    addComment: async () => {
        set({ loading: true });
        try {
            const { formData } = get();
            const response = await fetch(`${BASE_URL}/api/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            get().fetchComments;
            get().resetFormData;
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false })
        }
    },
    editComment: async (id) => {
        set({ loading: true });

        try {
            const { formData } = get();
            const response = await fetch(`${BASE_URL}/api/comments/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            get().fetchComments;
            get().resetFormData;

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }


        } catch (error) {
            console.log(error)
        } finally {
            set({ loading: false })
        }

    },
    deleteComment: async (id) => {
        set({ loading: true });
        try {
            await fetch(`${BASE_URL}/api/profiles/${id}`, {
                method: "DELETE",
            })
            set(prev => ({ comments: prev.comments.filter(p => p.id !== id) }));
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }

    },

}))
