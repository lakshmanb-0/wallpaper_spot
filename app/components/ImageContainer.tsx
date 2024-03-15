'use client'
import { allCollection, collectionCount, searchWall, searchWallCount } from '@/prisma/prismaDb';
import { Image } from '@nextui-org/react';
import { collection } from '@prisma/client';
import { useInView } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type TImageBox = {
    imageData: collection[],
}
const ImageContainer = ({ imageData }: TImageBox) => {
    const [data, setData] = useState<collection[] | undefined>(imageData)
    const pathName = usePathname()
    const router = useRouter()
    const ref = useRef(null)
    const countRef = useRef<number>(1)
    const isInView = useInView(ref)

    useEffect(() => {
        const fetchCount = async () => {
            let count: number | undefined = 0;
            pathName.includes('search')
                ? count = await searchWallCount(pathName.split('/')[2])
                : count = await collectionCount()

            countRef.current = count || 1
        }
        fetchCount()
    }, [])

    useEffect(() => {
        const fetchNewData = async () => {
            let el: any;
            pathName.includes('search')
                ? el = await searchWall(pathName.split('/')[2], data?.length || 0, 10)
                : el = await allCollection(data?.length || 0, 10)

            el?.length && setData([...data!, ...el])
        }
        isInView && fetchNewData();
    }, [isInView])

    return !!data?.length ? (
        <>
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
                    <div />
                </Masonry>
            </ResponsiveMasonry>
            {countRef.current == data?.length ?
                <div className=' pt-10 text-center font-bold'>--- You have reached the end point ---</div>
                : <div ref={ref} />
            }
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

}

export default ImageContainer