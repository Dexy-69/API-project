
import Logout from './Logout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


function MenuOp({ setUserLogin, username, serOpenMenu, setHeader, setShowInfoCards, setShowAboutContent }) {
  return (<div className='menu-op'>
    <p>{username}</p>
    <button className="navBtn home" onClick={() => { setHeader("Home page"); setShowInfoCards(true); setShowAboutContent(false) }}>Home</button>
    <button className="navBtn about" onClick={()=>{ setHeader("About us"); setShowInfoCards(false); setShowAboutContent(true)}}>About</button>
    <Logout setUserLogin={setUserLogin} serOpenMenu={serOpenMenu} />

  </div>)
}


export default function Header({ islogin, setCurrentPage, setUserLogin, username, setHeader, setShowInfoCards, setShowAboutContent}) {
  const [openMenu, setOpenMenu] = useState(false)

  let contetn = "";

  if (islogin === true) {
    contetn = <>
      <FontAwesomeIcon icon={faUser} className='user-icon' onClick={() => { openMenu === false ? setOpenMenu(true) : setOpenMenu(false) }} />
      {openMenu === true && <MenuOp setUserLogin={setUserLogin} username={username} serOpenMenu={setOpenMenu} setHeader={setHeader} setShowInfoCards={setShowInfoCards} setShowAboutContent={setShowAboutContent}/>}

    </>
  } else if (islogin === false) {

    contetn = <div>
      <button onClick={() => setCurrentPage("login")} className="navBtn login">
        Log In
      </button>
      <button onClick={() => setCurrentPage("signup")} className="navBtn signup">
        Sin Up
      </button>
    </div>

  }
  return (
    <>
      <header>
        <h1 className="logo">WP PROJECT</h1>
        <nav>
          {contetn}
        </nav>
      </header>
    </>
  )
}
