import React from 'react'
import { FileDotted } from 'phosphor-react';

export const NoFiles = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center opacity-60'>
            <FileDotted size="40" />
            <strong className="text-3xl"> No files found! </strong>
        </div>
    )
}
