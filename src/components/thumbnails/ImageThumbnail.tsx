import React from 'react'

interface Props {
    url: string
}

export const ImageThumbnail = (props: Props) => {
    const { url } = props
    console.log(url)
    return (
        <>
            {/* Make a thumbnail img */}
            <img src={url} alt="thumbnail" className='object-cover w-48 h-48 bg-png-background bg-[length:20px_20px]' />
        </>
    )
}
