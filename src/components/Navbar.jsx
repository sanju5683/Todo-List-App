import React from 'react'

function Navbar() {
    return (
        <div className='flex bg-violet-500 font-semibold justify-between px-8 text-xl py-2'>
            <div className="logo">iTask</div>
            {/* <ul className='flex gap-5'>
                <li>Home</li>
                <li>Tasks</li>
            </ul> */}
        </div>
    )
}

export default Navbar
