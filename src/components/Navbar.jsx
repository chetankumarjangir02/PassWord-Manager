import React from 'react'

const Navbar = () => {
  return (
    <nav className=" bg-slate-500 text-black flex justify-between items-center px-4 h-14">
        <div className="logo font-bold text-xl">PassWord Manager</div>
        {/* <ul>
            <li className='flex gap-4 '>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul> */}

        
        <button className='bg-slate-400 my-5 rounded-md flex justify-between items-center ring ring-white'>
          <img className='w-10 p-1'src="/public/github.svg" alt="gitHub" />
          <a href="https://github.com/chetankumarjangir02"><span className='font-bold px-2'>Github</span></a>
        </button>
        

    </nav>
  )
}

export default Navbar
