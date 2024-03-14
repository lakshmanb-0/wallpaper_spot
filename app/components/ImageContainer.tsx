'use client'
import { allCollection, searchWall } from '@/prisma/prismaDb';
import { Image, Spinner } from '@nextui-org/react';
import { collection } from '@prisma/client';
import { useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type TImageBox = {
    imageData: collection[],
    inputSearch: string,
}
const ImageContainer = ({ imageData, inputSearch }: TImageBox) => {
    const [data, setData] = useState<collection[] | undefined>(imageData)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const ref = useRef(null)
    const isInView = useInView(ref)

    // search image according to input search 
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let data = await searchWall(inputSearch)
            setData(data)
            setLoading(false)
        }
        if (!!inputSearch?.length) {
            fetchData();
        } else {
            setData(imageData)
        }
    }, [inputSearch, imageData])

    useEffect(() => {
        const fetchData = async () => {
            const imageData = await allCollection(data?.length || 0, 10);
            if (imageData?.length) {
                setData([...data!, ...imageData])
            }
        }
        fetchData();
    }, [isInView])
    return !loading ? (
        !!data?.length ? (
            <>
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 800: 3, 1200: 4 }}>
                    <Masonry gutter="5px">
                        {data?.map((el) => (
                            <Image
                                isBlurred
                                key={el?.id}
                                alt="WallPaper"
                                src={el?.src}
                                className='cursor-pointer hover:scale-90 transition-all ease-in-out duration-500'
                                onClick={() => router.push(`/info/${el.id}`)}
                            />
                        ))}
                        <div />
                    </Masonry>
                </ResponsiveMasonry>
                <div ref={ref} />
            </>
        )
            : (
                <section className='grid place-items-center p-4'>
                    <div>
                        <Image
                            alt="no found data"
                            src='/noImage.png'
                        />
                        <h1 className='font-bold text-center text-2xl'>No Image Found</h1>
                    </div>
                </section>
            )
    ) : (
        <section className="grid place-items-center h-screen">
            <Spinner size="lg" />
        </section>
    )
}

export default ImageContainer