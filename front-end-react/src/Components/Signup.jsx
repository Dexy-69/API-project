import { useState } from "react"

export default function Signup({ setLoginForm }) {
  const [un, setUn] = useState("")
  const [em, setEm] = useState("")
  const [pw, setPw] = useState("")
  const [showPw, setShowPw] = useState("password")


  async function addUser(username, email, password) {
    const res = await fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, email, password })
    })

    const data = await res.json()
    alert(data.msg)
    setLoginForm("login")
  }


  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); addUser(un, em, pw) }}>
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
      </form>
    </>
  )
}
