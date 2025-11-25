'use client'
import { createContext, useContext, useState } from "react";

interface SidebarContextType {
    isExpanded: boolean,
    setIsExpanded: (value: boolean) => void
}
const SidebarContext = createContext<SidebarContextType>(null!);

export const SidebarContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <SidebarContext.Provider value={{ isExpanded, setIsExpanded}}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebarContext = () => {
    return useContext(SidebarContext);
}
