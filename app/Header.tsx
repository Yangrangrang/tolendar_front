'use client'
import { useState } from "react"

export default function Header () {
  const [isOpen , setIsOpen] = useState();

  return (
    <>
      <header className="navbar container sm w-2/5 min-w-[60%] h-[50px] bg-orange-400 flex justify-between px-3">

        {/* navbar */}
        <nav>
          <div className=" group navbar-menu relative ">
            {/* menuLabel */}

            <span className=" menu-label cursor-pointer leading-[50px]">Menu</span>

            <ul className="menu-list absolute top-full left-0 m-0 p-0 bg-white border border-solid border=[#ccc] hidden group-hover:block z-50">
              <li className="p-2 hover:bg-[#f0f0f0]"><a href="#">Calendar</a></li>
              <li className="p-2 hover:bg-[#f0f0f0]"><a href="#">Todo</a></li>
            </ul>
          </div>
        </nav>

        <span className="navbar-title leading-[50px]">Tolender</span>
        <button className="header-user">
          Login
        </button>
      </header>
    </>
  )
}