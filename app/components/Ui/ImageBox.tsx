import React, { useState } from 'react'
import { Image } from '@nextui-org/react';

const ImageBox = ({ el }: { el: { id: string, src: string } }) => {
    const [image, setImage] = useState(false)

    return (
        <section className='relative'>
            <div className={`absolute top-0 left-0 z-40 ${image && 'hidden'}`}>
                <Image
                    loading='lazy'
                    key={el?.id}
                    alt="WallPaper"
                    src={el.src.replace('/upload/', '/upload/w_400,f_auto,q_auto/')}
                />
            </div>
            <div>
                <Image
                    loading='lazy'
                    key={el?.id}
                    alt="WallPaper"
                    src={el.src}
                    onLoad={() => {
                        setTimeout(() => setImage(true), 2000)
                    }}
                />
            </div>
        </section>

    )
}

export default ImageBox