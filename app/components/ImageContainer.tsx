'use client'
import { allCollection, collectionCount, searchWall, searchWallCount } from '@/prisma/prismaDb';
import { Image, Spinner } from '@nextui-org/react';
import { collection } from '@prisma/client';
import { useInView } from 'framer-motion';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Context, MyObjectContextType } from '../context/ContextProvider';
import ImageBox from './Ui/ImageBox'
import Link from 'next/link';
type TImageBox = {
    imageData: collection[],
    searchText?: string
}
const ImageContainer = ({ imageData, searchText }: TImageBox) => {
    const [data, setData] = useState<collection[]>(imageData ?? [])
    const [count, setCount] = useState<number | undefined>(0)
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


    return !!data?.length ? (
        <>
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 800: 3, 1200: 4 }}>
                <Masonry gutter='10px'>
                    {data?.map((el) => (
                        <Link href={`/info/${el.id}`} onClick={() => updateInfoData(el)} key={el?.id} className='relative hover:scale-90 transition-all ease-in-out duration-500'>
                            <ImageBox el={el} />
                            <div className='absolute inset-0 w-full h-full z-20' />
                        </Link>
                    ))}
                    <div />
                </Masonry>
            </ResponsiveMasonry>
            {count == data?.length
                ? <div className=' pt-10 text-center font-bold'>--- You have reached the end point ---</div>
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