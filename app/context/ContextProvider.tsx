'use client'
import { collection } from '@prisma/client';
import React, { createContext, useState } from 'react'


export type MyObjectContextType = {
    infoData: collection | undefined;
    updateInfoData: (newData: collection) => void;
}
export const Context = createContext<MyObjectContextType | null>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [infoData, setInfoData] = useState<collection | undefined>();

    // Function to update the object
    const updateInfoData = (newData: collection) => {
        setInfoData(newData);
    };

    return (
        <Context.Provider value={{ infoData, updateInfoData }}>
            {children}
        </Context.Provider>
    );
};


export default ContextProvider