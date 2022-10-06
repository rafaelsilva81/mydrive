import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Breadcumb = (props: { path: string }) => {

    const navigate = useNavigate();

    const { path } = props;
    const pathArray = path.split('/');
    const home = pathArray[0] // get first element
    const currentLocation = pathArray.at(-1) || home; // get last element or home

    return (
        /* breadcumb that will show where you are and provide links to other folders back */
        <div className="flex flex-wrap items-center justify-start mt-4">
            <div className="flex items-center">
                {/* link to home with custom name */}
                <button onClick={() => navigate('/workspace/')} className="text-teal-500 hover:text-teal-600 disabled:text-gray-500" disabled={currentLocation === home}>
                    Your Drive
                </button>
                <span className='text-gray-600'> / </span>
                {/* map the remaining of locations */}
                {pathArray.map((location, index) => {
                    const path = pathArray.slice(0, index + 1).join('/');
                    if (index != 0) { /* to not print home */
                        return (
                            <>
                                <button key={index} onClick={() => navigate(path)} className="text-teal-500 hover:text-teal-600 disabled:text-gray-500" disabled={currentLocation === location}>
                                    {location}
                                </button>
                                <span className="text-gray-600">/</span>
                            </>
                        )
                    }
                })}
            </div>
        </div>
    )
}
