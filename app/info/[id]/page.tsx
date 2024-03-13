'use server'
import { addViews, getWallInfo } from '@/prisma/prismaDb'
import React from 'react'
import InfoClient from './InfoClient'
import { revalidatePath } from 'next/cache'

const page = async ({ params }: { params: { id: string } }) => {
    const data = await getWallInfo(params.id)
    await addViews(params?.id);
    revalidatePath('/info/[id]');

    return (
        <InfoClient data={data!} />
    )
}

export default page