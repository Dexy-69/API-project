import { useState } from "react"
import InfoCard from "./InfoCard"
import postCard from "./postCard"



export default function Homepage({ data , header, setHeader, showInfoCards, setShowInfoCards}) {
    

    return (
        <>
            <h1 className="homePage">{header}</h1>
            {/* <InfoCard data={data} /> */}
            {showInfoCards === true && <InfoCard setHeader={setHeader} setShowInfoCards={setShowInfoCards}/>}
        </>
    )
}
