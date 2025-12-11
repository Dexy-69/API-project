import { useState } from "react"
import LoadingIcon from "./LoadingIcon"

export default function Signup({ setShowTfa, setSendEmail, setUn, setEm, setPw, un, em, pw }) {

  const [showPw, setShowPw] = useState("password")
  const [showLoadingIcon, setShowLoadingIcon] = useState(false)


  async function checkEmail(email) {
    if (un === "" || em === "" || pw === "") {
      alert("Entrys should not be empty")
      return
    }
    setShowLoadingIcon(true)
    const res = await fetch("http://127.0.0.1:5000/tfa_signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email })
    })

    const data = await res.json()

    if (data.msg === "Verification code has been sent") {

      setSendEmail(true)
      setShowTfa(true)
    }
  }


  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); checkEmail(em) }}>
        <h2>Sign Up</h2>
        <div className="label">
          <label>Username:</label>
          <input type="text" className="login-username" placeholder="Enter user name" onChange={(e) => setUn(e.target.value)} />
        </div>
        <div className="label">
          <label>Email:</label>
          <input type="email" className="login-email" placeholder="Enter email" onChange={(e) => setEm(e.target.value)} />
        </div>
        <div className="label">
          <label>Password:</label>
          <input type={showPw} className="login-password" placeholder="Enter password" onChange={(e) => setPw(e.target.value)} />
        </div>

        <div className="showPw">
          <input type="checkbox" className="chack" onClick={() => showPw === "password" ? setShowPw("text") : setShowPw("password")} />
          <p>Show password</p>

        </div>
        <button type="submit" className="login-btn">Submit</button>
        {showLoadingIcon === true && <LoadingIcon />}
      </form>
    </>
  )
}
