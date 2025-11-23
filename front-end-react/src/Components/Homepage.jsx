import { useState } from "react"
import InfoCard from "./InfoCard"
import postCard from "./postCard"
import About from "./About"



export default function Homepage({ data , header, setHeader, showInfoCards, setShowInfoCards, showAboutContent}) {
    

    return (
        <>
            <h1 className="homePage">{header}</h1>
            {/* <InfoCard data={data} /> */}
            {showInfoCards === true && <InfoCard setHeader={setHeader} setShowInfoCards={setShowInfoCards}/>}
            {showAboutContent === true && <About />}
        </>
    )
}
