import { ProfileType } from '@/types/types';
import { FormEvent } from 'react';
import { create } from 'zustand'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface FormData {
    username?: string,
    bio?: string,
    avatar_url?: string
}

interface ProfileState {
    profile: ProfileType | null,
    profiles: ProfileType[],
    loading: boolean,

    formData: FormData
    setFormData: (formData: FormData) => void,
    resetFormData: () => void,

    fetchProfiles: () => void,
    fetchProfile: (user_id: string) => void,

    editProfile: (id: string, event: FormEvent) => void,
    deleteProfile: (id: string) => void,
}

export const useCommentStore = create<ProfileState>((set, get) => ({
    profile: null,
    profiles: [],
    loading: false,
    formData: {
        username: "",
        bio: "",
        avatar_url: "",
    },
    setFormData: (formData) => set({ formData }),
    resetFormData: () => set({ formData: { username: "", bio: "", avatar_url: "" } }),

    fetchProfiles: async () => {
        set({ loading: true })
        try {
            const response = await fetch(`${BASE_URL}/api/profiles`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const { data } = await response.json();
            const profileData: ProfileType[] = data;
            set({ profiles: profileData, loading: false });
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });

        }
    },

    fetchProfile: async (user_id) => {
        set({ loading: true })
        try {
            const response = await fetch(`${BASE_URL}/api/profiles/${user_id}`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const { data } = await response.json();
            const profileData: ProfileType = data;
            set({ profile: profileData, loading: false });
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }
        
    },
    editProfile: async (user_id) => {
        set({ loading: true });

        try {
            const { formData } = get();
            const response = await fetch(`${BASE_URL}/api/profiles/${user_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            get().fetchProfiles;
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
    deleteProfile: async (id) => {
        set({ loading: true });
        try {
            await fetch(`${BASE_URL}/api/profiles/${id}`, {
                method: "DELETE",
            })
            set(prev => ({ profiles: prev.profiles.filter(p => p.user_id !== id) }));
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }

    },

}))
