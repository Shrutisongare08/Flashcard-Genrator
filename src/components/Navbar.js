import React from 'react'
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="m-auto mt-[20px] w-[80%] mb-1  p-[10px]">
        <div className="m-auto text-center  relative">
            <h1 className="text-[27px] font-bold text-left">Create Flashcard</h1>
            <ul className="flex flex-row space-x-11 font-bold text-gray-500 my-3 mx-1 text-base">
                <li className='navLinks'>
                    <Link to="/createflashcard">Create New</Link>
                </li>
                <li className='navLinks'>
                    <Link to="/myflashcard">MyFlashcard</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar