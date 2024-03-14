'use client'
import { addDownload } from '@/prisma/prismaDb'
import { BreadcrumbItem, Breadcrumbs, Button, Image } from '@nextui-org/react'
import { collection } from '@prisma/client'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const InfoClient = ({ data }: { data: collection }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    // download Image 
    const downloadImage = async () => {
        setLoading(true)
        const imageBlob = await fetch(data?.src).then(response => response.blob())
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(imageBlob);
        downloadLink.download = `${data.id}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setLoading(false)
        await addDownload(data?.id)

    }

    const handleTimeDisplay = (date: Date) => {
        let text = moment(date, "YYYYMMDD").fromNow()
        return text.replace(' minutes ago', 'm').replace('an hour ago', '1h').replace(' hours ago', 'h').replace('a day ago', '1d').replace(' days ago', 'd').replace('a year ago', '1y').replace(' years ago', 'y');
    }

    return (
        <div className='min-h-screen flex flex-col lg:grid lg:grid-cols-4 gap-8 bg-[#f7f7f8]'>
            <section className='flex flex-col bg-[#fcfcfd] lg:h-full p-5 sm:p-10 shadow-lg'>
                <Breadcrumbs className='pb-6'>
                    <BreadcrumbItem onClick={() => router.push('/')}>Home</BreadcrumbItem>
                    <BreadcrumbItem>Info</BreadcrumbItem>
                </Breadcrumbs>
                <header className='flex gap-3 items-center'>
                    <h1 className='truncate'>{data.author.toLowerCase().replaceAll(" ", "_")}</h1>
                    <p className='text-xs opacity-70' title={moment(data.date).format("DD MMM YYYY, h:mm a")}>{handleTimeDisplay(data.date)}</p>
                </header>
                <div className='py-5 opacity-80 text-sm'>
                    {data.prompt.split('--')[0]}
                </div>
                <div className='flex items-center gap-4 flex-wrap pb-8'>
                    {data.prompt.split('--')?.map((el, index) => index > 0 && (
                        <Button size='sm' title='Use in prompt' className='cursor-default' key={index}>{el}</Button>
                    ))}
                </div>
                <Button className='mt-3 lg:mt-auto ' onClick={downloadImage} isLoading={loading}>
                    Download
                </Button>
            </section>
            <div className='lg:col-span-3 m-auto p-5 sm:p-10  pointer-events-none '>
                <Image
                    isBlurred
                    alt="NextUI hero Image"
                    src={data?.src}
                    className='object-contain max-h-[90vh] my-auto '
                />
            </div>
        </div>
    )
}

export default InfoClient