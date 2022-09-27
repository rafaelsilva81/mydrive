import { Folder } from 'phosphor-react'
import React from 'react'

export const FolderThumbnail = () => {
    return (
        <div className="h-48 w-48 flex items-center justify-center bg-neutral-200 text-teal-500">
            <span className="text-8xl"> <Folder /> </span>
        </div>
    )
}
