
import { useState } from "react";
export default function AddPostContainer({ data, setShowAddPost, setOpValue, opValue }) {


    const [titleOrName, setTitleOrName] = useState("title")
    const [postIdOrUserId, setPostIdOrUserId] = useState("post_id")
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
                            <p>No posts</p>
                        ) : (
                            data[opValue].slice().reverse().map((el) => (
                                <div className="post" key={el[postIdOrUserId]} id={el[postIdOrUserId]}>
                                    <div className="post-text-contanier">
                                        <h3>{el[titleOrName]}</h3>
                                        {opValue === "user" && (<p className="text-email">{el.email}</p>)}
                                    </div>
                                    <button className="delBtn">Delete</button>
                                </div>
                            ))
                        )}
                    </div>

                    <button className="add-post-btn" onClick={() => { setShowAddPost(true) }}>Add {opValue}</button>

                </div>
            </div >

        </>
    )
}
