'use client'

import { LoginFormSchema, SignUpFormSchema } from '@/components/forms/formSchemas';
import { createFrontClient } from '@/utils/supabase/client';
import React, { createContext, useContext, useState } from 'react'
import z from 'zod';

interface ModalContextType {
    loading: boolean;
    setLoading: (value: boolean) => void;

    modalIsActive: boolean;
    setModalIsActive: (value: boolean) => void;

    modalFormType: string | null;
    setModalFormType: (value: string | null) => void;

    loginSubmit: (values: z.infer<typeof LoginFormSchema>) => void;
    signUpSubmit: (values: z.infer<typeof SignUpFormSchema>) => void;

}

const ModalContext = createContext<ModalContextType>(null!);

export const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [modalIsActive, setModalIsActive] = useState<boolean>(false);
    const [modalFormType, setModalFormType] = useState<string | null>(null);

    async function loginSubmit(values: z.infer<typeof LoginFormSchema>) {
        try {
            setLoading(true);
            const supabase = createFrontClient();
            const { data, error } = await supabase.auth.signInWithPassword({ email: values.email, password: values.password });
            if (error) {
                console.log("Login Error: ", error.message);

                return { success: false, error: error.message }
            }

            console.log("Logged in");
            setModalIsActive(false);
            return { success: true, data }
        } catch (err) {
            console.log("Unexpected error: ", (err as Error).message);
            return { success: false, error: "Unexpected" }
        } finally {
            setLoading(false);
        }
    }


    async function signUpSubmit(values: z.infer<typeof SignUpFormSchema>) {
        try {
            setLoading(true);
            const supabase = createFrontClient();
            console.log(values);

            const { data, error } = await supabase.auth.signUp(
                {
                    email: values.email,
                    password: values.password,
                    options: {
                        data: {
                            username: values.username
                        }
                    }
                });

            console.log(data);
            if (error) {
                console.log("Sign Up Error: ", error.message);
                return { success: false, error: error.message }
            }

            const user = data.user;

            await fetch('/api/create-profile', {
                method: 'POST',
                body: JSON.stringify({
                    id: user?.id,
                    email: values.email,
                    username: values.username
                }),
            });

            console.log("Signed Up Successfully");

            setModalIsActive(false);
            return { success: true, data };
        } catch (error) {
            console.log("Unexpected Error: ", (error as Error).message);
            return { success: false, error: "Unexpeccted" }
        } finally {
            setLoading(false);
        }
    }
    return (
        <ModalContext.Provider value={{ loading, setLoading, modalIsActive, setModalIsActive, modalFormType, setModalFormType, loginSubmit, signUpSubmit }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => {
    return useContext(ModalContext);
}