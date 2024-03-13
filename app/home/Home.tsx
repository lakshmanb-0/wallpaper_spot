'use client'
import React, { useCallback, useState } from 'react'
import Search from '../components/Search'
import ImageContainer from '../components/ImageContainer'
import { collection } from '@prisma/client'

const Home = ({ imageData }: { imageData: collection[] }) => {
    const [inputSearch, setInputSearch] = useState<string>('')

    const handleSearchValue = useCallback((value: string) => {
        setInputSearch(value);
    }, []);

    return (
        <main className='min-h-screen'>
            <header className="flex p-3 gap-4 items-center">
                <h1 className="font-bold text-xl sm:text-3xl whitespace-nowrap cursor-pointer select-none" onClick={() => setInputSearch('')}>WallPaper Spot</h1>
                <Search handleSearchValue={handleSearchValue} />
            </header>
            <section className="p-4">
                <ImageContainer imageData={imageData!} inputSearch={inputSearch} />
            </section>
        </main>
    )
}

export default Home