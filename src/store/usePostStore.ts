import { PostType } from '@/types/types'
import { create } from 'zustand'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface FormData {
  title: string,
  content: string,
  upload_url: string | undefined,
}

interface PostState {
  posts: PostType[],
  selectedPost: PostType | null,
  recentPosts: PostType[],
  loading: boolean,

  formData: FormData
  setFormData: (formData: FormData) => void,
  resetFormData: () => void,

  fetchPosts: () => void,
  fetchPost: (id:string) => void,
  fetchRecentPosts: () => void,

  addPost: () => void,
  editPost: (id: string) => void,
  deletePost: (id: string) => void,
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  selectedPost: null,
  recentPosts: [],
  loading: false,

  formData: {
    title: "",
    content: "",
    upload_url: "",
  },

  setFormData: (formData) => set({ formData }),

  resetFormData: () =>
    set({
      formData: {
        title: "",
        content: "",
        upload_url: "",
      }
    }),

  // ---------------------------------------------------------
  // FETCH POSTS
  // ---------------------------------------------------------
  fetchPosts: async () => {
    set({ loading: true });

    try {
      const response = await fetch(`${BASE_URL}/api/posts`, {cache: 'no-store'});
      if (!response.ok) throw new Error(`Status: ${response.status}`);

      const data = await response.json();
      set({ posts: data.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  // ---------------------------------------------------------
  // FETCH ONE POST
  // ---------------------------------------------------------
  fetchPost: async (id: string) => {
    set({ loading: true });
    console.log(id)
    try {
      const response = await fetch(`${BASE_URL}/api/posts/${id}`);
      if (!response.ok) throw new Error(`Status: ${response.status}`);

      const data = await response.json();
      set({ selectedPost: data.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchRecentPosts: async () => {},

  // ---------------------------------------------------------
  // ADD POST
  // ---------------------------------------------------------
  addPost: async () => {
    set({ loading: true });

    try {
      const { formData } = get();

      const response = await fetch(`${BASE_URL}/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Status: ${response.status}`);

      await get().fetchPosts();    
      get().resetFormData();       

    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  // ---------------------------------------------------------
  // EDIT POST
  // ---------------------------------------------------------
  editPost: async (id: string) => {
    set({ loading: true });
    console.log("BRUHHH")
    try {
      const { formData } = get();

      const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Status: ${response.status}`);

      await get().fetchPosts();  
      get().resetFormData();

    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  // ---------------------------------------------------------
  // DELETE POST
  // ---------------------------------------------------------
  deletePost: async (id) => {
    set({ loading: true });

    try {
      await fetch(`${BASE_URL}/api/posts/${id}`, { method: "DELETE" });

      set(prev => ({
        posts: prev.posts.filter(p => p.id !== id),
        selectedPost: null
      }));
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

}));
