import { useState } from "react";

export default function TwoFA({ setUserLogin, setShowTfa, checkLogin, tempId, setCurrentPage, sendEmil, un, em, pw }) {
  const [vCode, setVcode] = useState("")

  async function Verification(v) {
    if (sendEmil === false) {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ Verification: v, temp_id: tempId })
      })

      const data = await res.json()
      if (data.msg === "log in successful") {
        setUserLogin(true)
        setShowTfa(false)
      }
    } else if (sendEmil === true) {
      const res = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: un, email: em, password: pw, user_Verification: vCode })
      })

      const data = await res.json()
      console.log(data)
      if (data.msg === "user has been added successfully") {
        alert(data.msg)
        setShowTfa(false)
        setCurrentPage("login")
      }
    }
  }
  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); Verification(vCode) }} className="tfa-form">
        <input type="text" className="tfa-input" onChange={(e) => setVcode(e.target.value)} placeholder="Enter the verification code" />
        <button type="subit" className="navBtn">Submit</button>
      </form>
    </>
  )
}
