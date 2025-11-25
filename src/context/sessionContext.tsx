'use client'

;
import { ProfileType } from "@/types/types";
import { createFrontClient } from "@/utils/supabase/client";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface SessionContextType {
    sessionIsActive: boolean,
    setSessionIsActive: (value: boolean) => void

    userInfo: ProfileType | null
    setUserInfo: (value: ProfileType) => void

    checkSession: Dispatch<SetStateAction<ProfileType>>
}
const SessionContext = createContext<SessionContextType>(null!);

export const SessionContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [sessionIsActive, setSessionIsActive] = useState(false);
    const [userInfo, setUserInfo] = useState<ProfileType>(null!);

    const supabase = createFrontClient();   

    const checkSession = async () => {
        try {
            const { data, error } = await supabase.auth.getSession();
            if (data.session) {
                setSessionIsActive(true);
                const {user} = data.session;
                setUserInfo({user_id: user.id, email:user.email} as ProfileType);
            }
            else {
                setSessionIsActive(false);
                console.log("No user");
            }

            if (error) throw new Error(error.message);

        } catch (err) {
            console.log("Authentication error: ", err);
        }
    }

    useEffect(() => {
        checkSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSessionIsActive(!!session);
        })

        return () => listener.subscription.unsubscribe();
    }, [])
    return (
        <SessionContext.Provider value={{ sessionIsActive, setSessionIsActive, userInfo, setUserInfo, checkSession }}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSessionContext = () => {
    return useContext(SessionContext);
}
