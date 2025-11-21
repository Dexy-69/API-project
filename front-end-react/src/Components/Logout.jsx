

export default function Logout({ setUserLogin }) {

    async function logout() {
        const res = await fetch("http://127.0.0.1:5000/logout",
            {
                method: "GET",
                credentials: "include"
            }
        )
        const msg = await res.json()
        if (msg.msg === "logput successful") {
            setUserLogin(false)
        }
    }

    return (
        <button onClick={logout} className="navBtn">Logout</button>
    )
}
