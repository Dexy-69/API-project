
import InfoCard from "./InfoCard"
import PostCard from "./postCard"
import About from "./About"
import AddPostContainer from "./AddPostContainer"
import { useState } from "react"



export default function Homepage({ data , header, setHeader, showInfoCards, setShowInfoCards, showAboutContent}) {
       const [showAddPost, setShowAddPost] =  useState(false)
    return (
        <>
            <h1 className="homePage">{header}</h1>
            {header === "Show posts" && <PostCard data={data}/>}
            {header === "Add post" && <AddPostContainer data={data}/>}
            {showInfoCards === true && <InfoCard setHeader={setHeader} setShowInfoCards={setShowInfoCards}/>}
            {showAboutContent === true && <About />}
        </>
    )
}
