import { useState } from "react"
import LoadingIcon from "./LoadingIcon"


export default function Login({ setShowTfa, setTempId, setSendEmail }) {
    const [un, setUn] = useState("")
    const [pw, setPw] = useState("")
    const [showPw, setShowPw] = useState("password")
    const [showLoadingIcon, setShowLoadingIcon] = useState(false)


    async function login(username, password) {
        if (un === "" || pw === "") {
            alert("Entrys should not be empty")
            return
        }

        setShowLoadingIcon(true)

        const res = await fetch("http://127.0.0.1:5000/tfa_login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password })
        })


        const data = await res.json()
        if (data.msg === "Verification code has been sent") {
            setSendEmail(false)
            setTimeout(() => {
                setShowTfa(true)
                setTempId(data.temp_id)
            }, 4000)
        } else {
            setShowLoadingIcon(false)
            alert(data.msg)
        }

    }

    return (

        <>
            <form onSubmit={(e) => { e.preventDefault(); login(un, pw) }}>
                <h2>Log In</h2>
                <div className="label">
                    <label>Username:</label>
                    <input type="text" className="login-username" placeholder="Enter user name" onChange={(e) => setUn(e.target.value)} />
                </div>
                <div className="label">
                    <label>Password:</label>
                    <input type={showPw} className="login-password" placeholder="Enter password" onChange={(e) => setPw(e.target.value)} />
                </div>
                <div className="showPw">
                    <input type="checkbox" className="chack" onChange={() => showPw === "password" ? setShowPw("text") : setShowPw("password")} />
                    <p>Show password</p>

                </div>
                <button type="submit" className="login-btn">Submit</button>
                {showLoadingIcon === true && <LoadingIcon />}
            </form>
        </>
    )
}
