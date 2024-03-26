'use client'
import { allCollection, collectionCount, searchWall, searchWallCount } from '@/prisma/prismaDb';
import { Card, CardBody, Image, Spinner } from '@nextui-org/react';
import { collection } from '@prisma/client';
import { useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Context, MyObjectContextType } from '../context/ContextProvider';

type TImageBox = {
    imageData: collection[],
    searchText?: string
}
const ImageContainer = ({ imageData, searchText }: TImageBox) => {
    const [data, setData] = useState<collection[]>(imageData ?? [])
    const [count, setCount] = useState<number | undefined>(0)
    const router = useRouter()
    const ref = useRef(null)
    const isInView = useInView(ref)
    const { updateInfoData } = useContext(Context) as MyObjectContextType

    // fetch count from database 
    useEffect(() => {
        // fetch Count 
        const fetchCount = async () => {
            searchText
                ? setCount(await searchWallCount(searchText))
                : setCount(await collectionCount())
        }
        fetchCount()
    }, [searchText])

    // fetch new data of 10 items until data == count
    useEffect(() => {
        const fetchNextData = async () => {
            let el: any;
            searchText
                ? el = await searchWall(searchText, data?.length || 0, 10)
                : el = await allCollection(data?.length || 0, 10)

            el?.length && setData([...data!, ...el])
        }
        fetchNextData();
    }, [isInView])

    console.log(count, data?.length);

    return !!data?.length ? (
        <>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 800: 3, 1200: 4 }}>
                <Masonry gutter='10px'>
                    {data?.map((el) => (
                        <Card shadow="none" key={el?.id} isPressable onPress={() => { updateInfoData(el); router.push(`/info/${el.id}`) }} className='p-0'>
                            <CardBody className='relative cursor-pointer hover:scale-90 transition-all ease-in-out duration-500 p-0 overflow-hidden'>
                                <Image
                                    loading='lazy'
                                    isBlurred
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
                : <section className='text-center pt-3' ref={ref}>
                    <Spinner />
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