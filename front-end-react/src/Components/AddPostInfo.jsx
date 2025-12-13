import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import LoadingIcon from './LoadingIcon'


export default function AddPostInfo({ setShowAddPost, refresh, opValue }) {
  const [fileName, setFileName] = useState("No file yet")
  const [file, setFile] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState("private")
  const [wpUsername, setWpUsername] = useState("")
  const [wpEmail, setWpEmail] = useState("")
  const [wpPassword, setWpPassword] = useState("")
  const [showPw, setShowPw] = useState("password")
  const [showLoadingIcon, setShowLoadingIcon] = useState(false)

  async function handelPost() {
    // here it will handel post u will able to create delete posts
    if (title === "" || content === "") {
      alert("Title or Content can't be ampty")
      return
    }
    const formData = new FormData();

    const jsonData = {
      title,
      content,
      status
    }



    formData.append("img", file)
    formData.append("json", JSON.stringify(jsonData))
    setShowLoadingIcon(true)
    const res = await fetch("http://127.0.0.1:5000/add_post",
      {
        method: "POST",
        credentials: "include",
        body: formData
      }
    )

    const data = await res.json()

    if (data.msg === "post added") {
      setShowLoadingIcon(false)
      refresh()
      setShowAddPost(false)
    }

  }

  async function handelUser() {
    // here handel users u can create delete users
    if (wpUsername === "" || wpEmail === "" || wpPassword === "") {
      alert("Entrys should not be empty")
      return
    }
    setShowLoadingIcon(true)
    const res = await fetch("http://127.0.0.1:5000/add_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ wpUsername, wpEmail, wpPassword })
    })

    const data = await res.json()
    if (data.msg !== "Sorry, that username already exists!") {
      setShowLoadingIcon(false)
      refresh()
      setShowAddPost(false)
    } else {
      alert(data.msg)
      setShowLoadingIcon(false)
    }
  }

  if (opValue === "post") {
    return (
      <>

        <div className='add-post-frame'>
          <div className='clos-add-post-info'><FontAwesomeIcon icon={faX} id='x' onClick={() => { setShowAddPost(false) }} /></div>

          <input type="text" placeholder='Enter post title' className='post-title' onChange={(e) => { setTitle(e.target.value) }} />
          <textarea className='post-textarea' placeholder='Enter post content' onChange={(e) => { setContent(e.target.value) }} />
          <label className="upload-label">
            {fileName}
            <input
              type="file"
              className="upload-img"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFileName(file.name)
                  setFile(file)
                }
              }}
            />
          </label>

          <div className='Publish'>
            <input type="checkbox" onChange={(e) => { setStatus(e.target.checked ? "publish" : "private") }} />
            <p>Publish?</p>
          </div>
          {showLoadingIcon === true && <LoadingIcon />}
          <button className='navBtn add' onClick={() => handelPost()}>Add</button>
        </div>

      </>
    )
  } else {
    return (
      <>


        <div className='add-post-frame'>
          <div className='clos-add-post-info'><FontAwesomeIcon icon={faX} id='x' onClick={() => { setShowAddPost(false) }} /></div>

          <input type="text" placeholder='Enter username' className='post-title' onChange={(e) => { setWpUsername(e.target.value) }} />
          <input type="email" placeholder='Enter email' className='post-title' onChange={(e) => { setWpEmail(e.target.value) }} />
          <input type={showPw} placeholder='Enter password' className='post-title' onChange={(e) => { setWpPassword(e.target.value) }} />
          <div className="showPw show-pw-new-user">
            <input type="checkbox" className="chack" onChange={() => showPw === "password" ? setShowPw("text") : setShowPw("password")} />
            <p>Show password</p>

          </div>
          {showLoadingIcon === true && <LoadingIcon />}
          <button className='navBtn add' onClick={() => handelUser()}>Add</button>
        </div>

      </>
    )
  }
}
