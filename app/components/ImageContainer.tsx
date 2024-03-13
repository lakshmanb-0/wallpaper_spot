'use client'
import { searchWall } from '@/prisma/prismaDb';
import { Image } from '@nextui-org/react';
import { collection } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type TImageBox = {
    imageData: collection[],
    inputSearch: string,
}
const ImageContainer = ({ imageData, inputSearch }: TImageBox) => {
    const [data, setData] = useState<collection[] | undefined>(imageData)
    const router = useRouter()

    // search image according to input search 
    useEffect(() => {
        const fetchData = async () => {
            let data = await searchWall(inputSearch)
            setData(data)
        }
        if (!!inputSearch?.length) {
            fetchData();
        } else {
            setData(imageData)
        }
    }, [inputSearch, imageData])

    return !!data?.length ? (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 800: 3, 1200: 4 }}>
            <Masonry gutter="5px">
                {data?.map((el) => (
                    <Image
                        key={el?.id}
                        alt="WallPaper"
                        src={el?.src}
                        className='cursor-pointer hover:scale-90 transition-all ease-in-out duration-500'
                        onClick={() => router.push(`/info/${el.id}`)}
                    />
                ))}
            </Masonry>
        </ResponsiveMasonry>
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
}

export default ImageContainer