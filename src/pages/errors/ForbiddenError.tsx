import React from 'react'
import { useNavigate } from 'react-router-dom'

const ForbiddenError = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    /* go back to /workspace */
    navigate('/workspace/');
  }
  return (
    /* 403  error */
    <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="text-teal-500 text-7xl font-bold m-4 text-center md:text-start md:text-8xl">403 - Forbidden</div>
        <div className="text-gray-700 text-2xl mb-2 text-center md:text-start"> You don't have permission to view this drive </div>
        <button className="bg-teal-500 hover:bg-teal-600 rounded-lg text-white p-4" onClick={handleClick}> Go back to your drive </button> 
    </div>
  )
}

export default ForbiddenError