import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


export default function AddPostInfo({ setShowAddPost, refresh, opValue }) {
  const [fileName, setFileName] = useState("No file yet")
  const [file, setFile] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [publish, setPublish] = useState("private")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState("password")

  async function handelPost() {
    // here it will handel post u will able to create delete posts
    const formData = new FormData();

    const jsonData = {
      title: title,
      content: content,
      publish: publish
    }

    formData.append("img", file)
    formData.append("json", JSON.stringify(jsonData))

    const res = await fetch("http://127.0.0.1:5000/add_data",
      {
        method: "POST",
        credentials: "include",
        body: formData
      }
    )

    const data = await res.json()
    if (data.msg === "post added") {
      refresh()
      setShowAddPost(false)
    }

  }

  async function handelUser() {
    // here handel users u can create delete users
    const res = await fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, email, password })
    })

    const data = await res.json()
    console.log(data)
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
            <input type="checkbox" onChange={(e) => { setPublish(e.target.checked ? "publish" : "private") }} />
            <p>Publish?</p>
          </div>
          <button className='navBtn add' onClick={() => handelPost()}>Add</button>
        </div>

      </>
    )
  } else {
    return (
      <>


        <div className='add-post-frame'>
          <div className='clos-add-post-info'><FontAwesomeIcon icon={faX} id='x' onClick={() => { setShowAddPost(false) }} /></div>

          <input type="text" placeholder='Enter username' className='post-title' onChange={(e) => { setUsername(e.target.value) }} />
          <input type="email" placeholder='Enter email' className='post-title' onChange={(e) => { setEmail(e.target.value) }} />
          <input type={showPw} placeholder='Enter password' className='post-title' onChange={(e) => { setPassword(e.target.value) }} />
          <div className="showPw">
            <input type="checkbox" className="chack" onChange={() => showPw === "password" ? setShowPw("text") : setShowPw("password")} />
            <p>Show password</p>

          </div>
          <button className='navBtn add' onClick={() => handelUser()}>Add</button>
        </div>

      </>
    )
  }
}
