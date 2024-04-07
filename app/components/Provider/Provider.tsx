'use client'
import React from 'react'
import { NextUIProvider } from "@nextui-org/react";
import Navbar from '../Navbar';
import ContextProvider from '@/app/context/ContextProvider';
const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <NextUIProvider>
            <Navbar />
            <ContextProvider>
                {children}
            </ContextProvider>
        </NextUIProvider>
    )
}

export default Provider