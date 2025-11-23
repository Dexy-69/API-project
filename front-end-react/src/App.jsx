import { useState, useEffect } from 'react'
import Login from './Components/Login'
import Homepage from './Components/Homepage'
import "./index.css"
import Header from './Components/Header'
import Signup from './Components/Signup'
import TwoFA from './Components/TwoFA'


export default function App() {
  const [userLogin, setUserLogin] = useState(null)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState("login")
  const [tfaShow, setTfaShow] = useState(false)
  const [tempId, setTempId] = useState("")
  const [sendEmil, setSendEmail] = useState(false)
  const [un, setUn] = useState("")
  const [em, setEm] = useState("")
  const [pw, setPw] = useState("")
  const [header, setHeader] = useState("Home page")
  const [showInfoCards, setShowInfoCards] = useState(true)

  async function getData() {
    const res = await fetch("http://127.0.0.1:5000/get_data", {
      method: "GET",
      credentials: "include"
    })

    if (res.ok) {
      const data = await res.json()
      setData(data)
      setUserLogin(true)
    } else {
      setUserLogin(false)
    }

  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <>
      <Header islogin={userLogin} 
      setCurrentPage={setCurrentPage} 
      setUserLogin={setUserLogin} 
      username={data.name} 
      setHeader={setHeader}
      setShowInfoCards={setShowInfoCards}/>

      <section>

        {tfaShow === true && <TwoFA setUserLogin={setUserLogin}
          setShowTfa={setTfaShow}
          checkLogin={getData}
          tempId={tempId} sendEmil={sendEmil}
          un={un} em={em} pw={pw}
          setCurrentPage={setCurrentPage} />}

        {userLogin === false && currentPage === "login" && tfaShow === false && <Login setShowTfa={setTfaShow} 
        setTempId={setTempId} setSendEmail={setSendEmail} />}

        {userLogin === false && currentPage === "signup" && tfaShow === false && <Signup
          setShowTfa={setTfaShow}
          setSendEmail={setSendEmail}
          setUn={setUn} setEm={setEm} setPw={setPw}
          un={un} em={em} pw={pw} />}

        {userLogin === true && tfaShow === false && <Homepage data={data} 
        header={header} 
        setHeader={setHeader} 
        showInfoCards={showInfoCards} 
        setShowInfoCards={setShowInfoCards}/>}

      </section>
    </>
  )
}


