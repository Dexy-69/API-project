
import { useState } from "react";
import LoadingIcon from "./LoadingIcon";
export default function AddPostContainer({ data, setShowAddPost, setOpValue, opValue, refresh }) {


    const [titleOrName, setTitleOrName] = useState("title")
    const [postIdOrUserId, setPostIdOrUserId] = useState("post_id")
    const [showLoadingIcon, setShowLoadingIcon] = useState(false)


    async function handelDeletPost(postIdWatnToDel) {
        // func for del post using the id of the post
        setShowLoadingIcon(true)
        const res = await fetch("http://127.0.0.1:5000/delete_post", {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postIdWatnToDel })
        })

        const data = await res.json()
        if (data.msg === "Post deleted successfully.") {
            setShowLoadingIcon(false)
            refresh()
        }
    }


    return (
        <>
            <div className="container addPostContainer">
                <div className="select-container">
                    <select className="select" title="You can choose if you want to edit user or post." value={opValue} onChange={(e) => {
                        const val = e.target.value;
                        setOpValue(val);

                        if (val === "post") {
                            setTitleOrName("title");
                            setPostIdOrUserId("post_id");
                        } else {
                            setTitleOrName("user_name");
                            setPostIdOrUserId("user_id");
                        }
                    }} >
                        <option value="post">Posts</option>
                        <option value="user">Users</option>
                    </select>
                </div>
                <div className="edit-add-post-container">
                    <div className="posts-container">
                        {data[opValue].length === 0 ? (
                            <p>{opValue === "post" ? "No posts" : "No users"}</p>
                        ) : (
                            data[opValue].slice().reverse().map((el) => (
                                <div className="post" key={el[postIdOrUserId]} id={el[postIdOrUserId]}>
                                    <div className="post-text-contanier">
                                        <h3>{el[titleOrName]}</h3>
                                        {opValue === "user" && (<p className="text-email">{el.email}</p>)}
                                    </div>
                                    <button className="delBtn" onClick={(e) => {
                                        const postIdToDel = e.target.closest("[id]").id;

                                        handelDeletPost(postIdToDel)
                                    }}>Delete</button>

                                </div>
                            ))
                        )}
                    </div>
                    <div className="loading-contanier">
                        {showLoadingIcon === true && <LoadingIcon />}
                    </div>

                    <button className="add-post-btn" onClick={() => { setShowAddPost(true) }}>Add {opValue}</button>

                </div>
            </div >

        </>
    )
}
