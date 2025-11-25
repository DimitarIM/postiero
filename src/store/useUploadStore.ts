import { Upload } from "@/types/types";
import { create } from "zustand";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface UploadState {
    upload: Upload | null,
    newUpload: Upload | null,

    fetchUpload: () => void,
    deleteUpload: () => void,
    updateUpload: () => void,
}

export const useUploadStore = create<UploadState>((set, get) => ({
    upload: null,
    newUpload: null,

    fetchUpload: async () => {
        try {
            const res = await fetch('/api/posts/uploads');
            const { data } = await res.json();
            set({ upload: data })

        } catch (error) {
            console.log(error);
        }
    },
    deleteUpload: async () => {
        try {
            await fetch('/api/posts/uploads', { method: "DELETE" });
            set({ upload: null })

        } catch (error) {
            console.log(error);
        }
    },
    updateUpload: async () => {
        try {
            const res = await fetch('/api/posts/uploads', {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(get().newUpload)
            });
            const { data } = await res.json();
            set({ upload: data })

        } catch (error) {
            console.log(error);
        }
    },


}));