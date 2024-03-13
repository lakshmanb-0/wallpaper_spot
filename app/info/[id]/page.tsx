'use server'
import { addViews, getWallInfo } from '@/prisma/prismaDb'
import React from 'react'
import InfoClient from './InfoClient'

const page = async ({ params }: { params: { id: string } }) => {
    const data = await getWallInfo(params.id)
    await addViews(params?.id);

    return (
        <InfoClient data={data!} />
    )
}

export default page