'use client'
import { createManyWallPaper, createWallPaper } from '@/prisma/prismaDb'
import { Button, Input, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import * as XLSX from 'xlsx';

export type TInput = {
    author: string,
    prompt: string,
    src: string,
}

const AdminPage = () => {
    const [input, setInput] = useState<TInput>({ author: '', prompt: '', src: '' })
    const [loading, setLoading] = useState<boolean>(false)
    const [upload, setUpload] = useState({})

    // handle Input Changes 
    const handleChange = (key: string, value: String) => {
        setInput({ ...input, [key]: value })
    }

    // handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        let data: TInput = {
            author: input.author,
            prompt: input.prompt,
            src: input.src
        }
        const newWall = await createWallPaper(data)
        console.log(newWall);
        setInput({ author: '', prompt: '', src: '' })
        setLoading(false)
    }

    const convertExcelToJson = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        const { files } = event.target;
        const selectedFiles = files as FileList;
        const reader = new FileReader();
        reader.onload = async (e: any) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            console.log('JSON data:', jsonData);
            setUpload(jsonData)
            setLoading(false)
        };
        reader.readAsArrayBuffer(selectedFiles?.[0]);

    }

    const handleUpload = async () => {
        setLoading(true)
        let a = await createManyWallPaper(upload)
        console.log(a);
        setLoading(false)
    }
    return (
        <section className='grid grid-cols-2 gap-10 h-screen items-center justify-center max-w-[900px] mx-auto p-4'>
            <form onSubmit={handleSubmit}>
                <h1 className='font-bold text-4xl p-4 text-center'>Add Wallpaper</h1>
                <section className='flex flex-col gap-4 w-full'>
                    <Input variant={'faded'} label="Author" value={input.author} onChange={(e) => handleChange('author', e.target.value)} />
                    <Textarea minRows={2} label="Prompt" value={input.prompt} onChange={(e) => handleChange('prompt', e.target.value)} />
                    <Input variant={'faded'} label="Path" value={input.src} onChange={(e) => handleChange('src', e.target.value)} />
                    <Button type="submit" color='primary' isLoading={loading}>Submit</Button>
                </section>
            </form>
            <form className='px-3'>
                <h1 className='font-bold text-4xl p-4 text-center'>Batch Upload</h1>
                <div className='flex flex-col gap-10 py-10'>
                    <input type="file" name="" id="" onChange={convertExcelToJson} />
                    <Button type="submit" color='primary' isLoading={loading} onClick={handleUpload}>Upload</Button>
                </div>

            </form>
        </section>

    )
}

export default AdminPage
