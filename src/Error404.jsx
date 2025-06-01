import React from 'react'

const Error404 = () => {
  return (
    <div className='bg-[#974FD0] h-[100vh] flex flex-col items-center justify-center'>
      <div className='w-100'>
        <img src="/404.png" alt="ERROR 404" />
      </div>
      <div>
        <button className='px-4 py-2 rounded border border-white text-white hover:bg-[#d9b6fe] hover:text-[#b75fff]'><a href="/">Back To Home</a></button>
      </div>
    </div>
  )
}

export default Error404