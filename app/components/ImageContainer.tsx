'use client'
import { allCollection, collectionCount, searchWall, searchWallCount } from '@/prisma/prismaDb';
import { Card, CardBody, Image, Spinner } from '@nextui-org/react';
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
    const [count, setCount] = useState<number | undefined>(0)
    const pathName = usePathname()
    const router = useRouter()
    const ref = useRef(null)
    const isInView = useInView(ref)

    // fetch count from database 
    useEffect(() => {
        const fetchCount = async () => {
            pathName.includes('search')
                ? setCount(await searchWallCount(pathName.split('/')[2]))
                : setCount(await collectionCount())
        }
        fetchCount()
    }, [])

    // fetch new data of 10 items until data == count
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
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 800: 3, 1200: 4, 1500: 5 }}>
                <Masonry gutter='10px'>
                    {data?.map((el) => (
                        <Card shadow="none" key={el?.id} isPressable onPress={() => router.push(`/info/${el.id}`)} className='p-0'>
                            <CardBody className='relative cursor-pointer hover:scale-90 transition-all ease-in-out duration-500 p-0'>
                                <Image
                                    key={el?.id}
                                    alt="WallPaper"
                                    src={el?.src}
                                />
                                <div className='absolute inset-0 w-full h-full z-20' />
                            </CardBody>
                        </Card>
                    ))}
                    <div />
                </Masonry>
            </ResponsiveMasonry>
            {count == data?.length ?
                <div className=' pt-10 text-center font-bold'>--- You have reached the end point ---</div>
                : <section className='text-center pt-3'>
                    <Spinner />
                    <div ref={ref} />
                </section>
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