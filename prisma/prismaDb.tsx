'use server'
import { collection } from "@prisma/client";
import { prisma } from './prisma'
import { TInput } from "@/app/admin/99887/AdminPage";

//upload many wallpapers
export const createManyWallPaper = async (data: any) => {
    try {
        const newData = data.map((el: string[], index: number) => index !== 0 && ({
            author: el[0],
            prompt: el[1],
            src: el[2],
            tags: el[3]?.split(',')
        }));

        // Filter out undefined values
        const filteredData = newData.filter((el: collection) => el);

        const newAddedData = await prisma.collection.createMany({
            data: filteredData
        });
        return newAddedData
    } catch (error) {
        console.error('Error uploading many wallpapers:', error);
    } finally {
        await prisma.$disconnect();
    }
}

//upload single wallpaper
export const createWallPaper = async (data: TInput) => {
    try {
        const newWall: collection = await prisma.collection.create({
            data: {
                author: data?.author,
                prompt: data?.prompt,
                src: data?.src,
                tags: data?.tags.split(',')
            },
        })
        return newWall;
    } catch (error) {
        console.error('Error uploading wallpaper:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// get wallpaper info 
export const getWallInfo = async (id: string) => {
    try {
        const getWall = await prisma.collection.findUnique({
            where: { id: id }
        })
        return getWall;
    } catch (error) {
        console.error('Error getting wallpaper:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// increment Download  
export const addDownload = async (id: string) => {
    try {
        const current = await prisma.collection.update({
            where: { id: id },
            data: { download: { increment: 1 } }
        })
        return current;
    } catch (error) {
        console.error('Error increases wallpaper:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// increment views  
export const addViews = async (id: string) => {
    try {
        const current = await prisma.collection.update({
            where: { id: id },
            data: { views: { increment: 1 } }
        })
        return current;
    } catch (error) {
        console.error('Error increases wallpaper:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// get All collection 
export const allCollection = async (skipNumber: number, takeNumber: number) => {
    try {
        const allImages: collection[] = await prisma.collection.findMany({
            skip: skipNumber,
            take: takeNumber,
            orderBy: {
                id: 'desc'
            }
        })
        return allImages;
    } catch (error) {
        console.error('Error getting collection:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// get All collection Count 
export const collectionCount = async () => {
    try {
        const count = await prisma.collection.count()
        return count;
    } catch (error) {
        console.error('Error getting collection:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// search wallpaper count 
export const searchWallCount = async (input: string) => {
    try {
        const count = await prisma.collection.count({
            where: {
                prompt: { contains: input, mode: 'insensitive' }
            }
        });
        return count;
    } catch (error) {
        console.error('Error searching collection:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// search wallpaper 
export const searchWall = async (input: string, skipNumber: number, takeNumber: number) => {
    try {
        const searchedImage = await prisma.collection.findMany({
            skip: skipNumber,
            take: takeNumber,
            where: {
                prompt: { contains: input, mode: 'insensitive' }
            },
            orderBy: {
                id: 'desc'
            }
        });
        return searchedImage;
    } catch (error) {
        console.error('Error searching collection:', error);
    } finally {
        await prisma.$disconnect();
    }
}