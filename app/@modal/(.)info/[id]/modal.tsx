'use client';

import { type ElementRef, useEffect, useContext, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import InfoClient from "@/app/info/[id]/InfoClient";
import { Context, MyObjectContextType } from "@/app/context/ContextProvider";
import { addViews } from '@/prisma/prismaDb';

export function Modal({ id }: { id: string }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<'dialog'>>(null);
    const { infoData } = useContext(Context) as MyObjectContextType
    useEffect(() => {
        const FetchViewData = async () => {
            await addViews(id)
        }
        FetchViewData()
    }, [id])

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
            document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
        }
    }, []);

    function onDismiss() {
        document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
        router.back();
    }

    return createPortal(
        <section className={`absolute top-0 left-0 w-screen h-screen z-[999] backdrop-blur-sm `}>
            <dialog ref={dialogRef} className="max-w-5xl mx-auto rounded-2xl bg-red-500" onClose={onDismiss}>
                <InfoClient data={infoData!} modal={true} />
                <button onClick={onDismiss} className="close-button z-50" />
            </dialog>
        </section>,
        document.getElementById('modal-root')!
    );
}