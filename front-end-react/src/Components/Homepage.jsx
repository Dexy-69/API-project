
import InfoCard from "./InfoCard"
import PostCard from "./postCard"
import About from "./About"
import AddPostContainer from "./AddPostContainer"
import { useState } from "react"
import AddPostInfo from './AddPostInfo'



export default function Homepage({ data, header, setHeader, showInfoCards, setShowInfoCards, showAboutContent, refresh }) {
    const [showAddPost, setShowAddPost] = useState(false)
    const [opValue, setOpValue] = useState("post");
    return (
        <>
            <h1 className="homePage">{header}</h1>
            {header === "Show posts" && <PostCard data={data} />}
            {showAddPost === true && <AddPostInfo setShowAddPost={setShowAddPost} refresh={refresh} opValue={opValue} />}
            {header === "Add post / user" && <AddPostContainer data={data} setShowAddPost={setShowAddPost} opValue={opValue} setOpValue={setOpValue} refresh={refresh}/>}
            {showInfoCards === true && <InfoCard setHeader={setHeader} setShowInfoCards={setShowInfoCards} />}
            {showAboutContent === true && <About />}
        </>
    )
}
