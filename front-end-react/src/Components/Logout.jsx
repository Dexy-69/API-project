

export default function Logout({ setUserLogin, serOpenMenu }) {

    async function logout() {
        const res = await fetch("http://127.0.0.1:5000/logout",
            {
                method: "GET",
                credentials: "include"
            }
        )
        const msg = await res.json()
        if (msg.msg === "logout successful") {
            setUserLogin(false)
            serOpenMenu(false)
        }
    }

    return (
        <button onClick={logout} className="navBtn logout">Logout</button>
    )
}
