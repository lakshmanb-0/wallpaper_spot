import React from 'react'
import ImageContainer from '../../components/ImageContainer'
import { searchWall } from '@/prisma/prismaDb'
import { revalidatePath } from 'next/cache'

export default async function page({ params }: { params: { id: string } }) {
    let imageData = await searchWall(params.id.replaceAll('%20', ' '), 0, 10)
    revalidatePath('/search/' + params.id)
    return (
        <main className='min-h-screen max-width'>
            <section className="p-4">
                <ImageContainer imageData={imageData!} searchText={params.id?.replaceAll('%20', ' ')} />
            </section>
        </main>
    )
}
