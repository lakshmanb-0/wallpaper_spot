'use client'
import React, { useContext, useEffect, useState } from "react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { addViews } from "@/prisma/prismaDb";
import InfoClient from "@/app/info/[id]/InfoClient";
import { Context, MyObjectContextType } from "@/app/context/ContextProvider";

export default function App({ params }: { params: { id: string } }) {
    const { infoData } = useContext(Context) as MyObjectContextType
    const router = useRouter()
    const [open, setOpen] = useState(true)

    useEffect(() => {
        const FetchViewData = async () => {
            await addViews(params.id)
        }
        FetchViewData()
    }, [params.id])

    return (
        <Modal backdrop={'blur'} isOpen={open}
            onOpenChange={(el) => {
                setOpen(el)
                router.back()
            }}
            size="5xl" radius="sm" scrollBehavior="inside">
            <ModalContent >
                <InfoClient data={infoData!} modal={true} />
            </ModalContent>
        </Modal>
    );
}
