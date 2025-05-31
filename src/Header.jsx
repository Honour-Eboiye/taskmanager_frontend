import React from 'react'
import { Link } from 'react-router'

const Header = () => {
  return (
    <div className='flex justify-between  border-b-gray-300 border-b items-center custom-container py-2 sm:py-5 '>
      {/* LOGO */}
      <div>
        <Link to='/'>
          <img src="/LOGO.png" alt="TaskDuty" className='w-25'/>
        </Link>
      </div>

      <div className='flex gap-10 items-center'>
        {/* MENUS */}
        <div className='flex gap-5 invisible sm:visible'>
          <Link to='/new_task'>New Task</Link>
          <Link to='./all_tasks'>All Tasks</Link>
        </div>

        {/* PROFILE */}
        <div>
          <img src="/PROFILE.png" alt="Profile" className='w-10'/>
        </div>
      </div>

    </div>
  )
}

export default Header