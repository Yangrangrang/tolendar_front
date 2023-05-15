'use client'
import { useEffect, useState } from "react"

export default function Header () {
  const [isLoggedIn , setIsLoggedIn ] = useState(false);

  // 로컬스토리지에 토큰이 있는지 확인 (nextjs는 클라이언트사이드에 존재하는 window,document 전역객체를 사용할 수 없다.)

  // 1번째 방법
  useEffect(()=> {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  })

  // 2번째 방법
  // useEffect(() => {
  //   if (typeof window !== 'undefined' && localStorage.getItem('token')) {
  //     setIsLoggedIn(!isLoggedIn);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [])

  // 있으면 서버에 넘겨서 유효한지 확인

  return (
    <>
      <header className="navbar flex justify-between px-3 border-y-4 border-orange-100">

        {/* navbar */}
        <nav>
          <div className=" group navbar-menu relative ">
            {/* menuLabel */}

            <span className=" menu-label cursor-pointer leading-[50px]">Menu</span>

            <ul className="menu-list absolute top-full left-0 m-0 p-0 bg-white border border-solid border=[#ccc] hidden group-hover:block z-50">
              <li className="p-2 hover:bg-[#f0f0f0]"><a href="/calendar">Calendar</a></li>
              <li className="p-2 hover:bg-[#f0f0f0]"><a href="#">Todo</a></li>
            </ul>
          </div>
        </nav>

        <span className="navbar-title leading-[50px]"><a href="/">Tolender</a></span>

        {isLoggedIn ? (<button className="header-user">
          <a href="/login">Profile</a>
        </button>) : (<button className="header-user">
          <a href="/login">Login</a>
        </button>)}

      </header>
    </>
  )
}