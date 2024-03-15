import React from 'react'
import ImageContainer from '../../components/ImageContainer'
import { searchWall } from '@/prisma/prismaDb'

export default async function page({ params }: { params: { id: string } }) {
    let imageData = await searchWall(params.id, 0, 10)

    return (
        <main className='min-h-screen'>
            <section className="p-4">
                <ImageContainer imageData={imageData!} />
            </section>
        </main>
    )
}
