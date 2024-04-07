'use client';

import { type ElementRef, useEffect, useContext, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import InfoClient from "@/app/info/[id]/InfoClient";
import { Context, MyObjectContextType } from "@/app/context/ContextProvider";

export function Modal({ id }: { id: string }) {
    const router = useRouter();
    const [show, setShow] = useState(true)
    const dialogRef = useRef<ElementRef<'dialog'>>(null);
    const { infoData } = useContext(Context) as MyObjectContextType

    useEffect(() => {
        if (!dialogRef.current?.open) {
            document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
            setShow(true)
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        setShow(false)
        router.back();
        document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
    }
    console.log('dialog', dialogRef.current?.open);
    console.log('show', show);

    return createPortal(
        <section className='absolute top-0 left-0 w-screen h-screen backdrop-blur-sm z-[999]'>
            <dialog ref={dialogRef} className="max-w-5xl mx-auto rounded-2xl bg-red-500" onClose={onDismiss}>
                <InfoClient data={infoData!} modal={true} />
                <button onClick={onDismiss} className="close-button z-50" />
            </dialog>
        </section>,
        document.getElementById('modal-root')!
    );
}