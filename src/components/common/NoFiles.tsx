import React from 'react'
import { FileDotted } from 'phosphor-react';

export const NoFiles = () => {
    return (
        <div className='w-full h-full flex justify-center items-center opacity-60 mt-48'>
            <FileDotted size="40" />
            <strong className="text-3xl"> No files found! </strong>
        </div>
    )
}
