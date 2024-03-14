'use server'
import { addViews } from '@/prisma/prismaDb'
import React from 'react'
import InfoClient from './InfoClient'

const page = async ({ params }: { params: { id: string } }) => {
    const data = await addViews(params?.id);

    return (
        <InfoClient data={data!} />
    )
}

export default page