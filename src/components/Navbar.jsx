// import React from 'react'

function Navbar() {
    return (
        <div className='flex bg-violet-500 font-semibold justify-between px-8 text-4xl py-2'>
            <div className="logo flex items-center gap-3"><img width={46} src="/src/assets/task.png" alt="" />
            <span>iTask </span>
            </div>
            {/* <ul className='flex gap-5'>
                <li>Home</li>
                <li>Tasks</li>
            </ul> */}
        </div>
    )
}

export default Navbar
