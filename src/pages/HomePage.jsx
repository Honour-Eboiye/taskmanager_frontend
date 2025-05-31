import React from 'react'

const HomePage = () => {
  return (
    <div className='custom-container justify-between items-center w-auto py-5 max-h-[100vh] sm:flex flex-row'>
      <div className='flex flex-col gap-4 sm:w-[60%]'>
        <div className=' flex flex-col gap-1 font-semibold text-2xl lg:text-3xl'>
          <h1>Manage your Tasks on</h1>
          <h1 className='color'>TaskDuty</h1>
        </div>
        <div className='text-[13px]'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi inventore, nemo sint minus tempore, necessitatibus nobis minima veniam quas dolorum hic omnis praesentium ratione. Temporibus tempore sed blanditiis provident vel.</p>
        </div>
        <div>
          <a href="/sign_up"><button className='custom-button'>Go to My Tasks</button></a>
        </div>
      </div>

      {/* IMAGES */}
      {/* Changes */}
      <div className='mx-auto w-60 lg:w-100'>
        <img src="/SLIDE1.png" alt="Worker" />
      </div>
    </div>
  )
}

export default HomePage