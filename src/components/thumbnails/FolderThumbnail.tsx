import { Folder } from 'phosphor-react'
import React from 'react'

export const FolderThumbnail = () => {
    return (
        <div className="h-36 w-36 flex items-center justify-center bg-neutral-200 text-teal-500">
            <span className="text-8xl"> <Folder weight='fill' /> </span>
        </div>
    )
}
