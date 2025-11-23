

export default function InfoCard({setHeader, setShowInfoCards}) {
  return (
    <>
    
    <div className="container">
        <div className="show-posts card-post-container">
            <h3>
                Show posts
            </h3>
            <p>
                Here you can browse the posts you create
            </p>
            <button className="navBtn" onClick={()=>{setHeader("Show posts"); setShowInfoCards(false)}}>Show</button>
        </div>
        <div className="add-post card-post-container">
            <h3>Add post</h3>
            <p>Here you can add edit and delete posts</p>
            <button className="navBtn" onClick={()=>{setHeader("Add post"); setShowInfoCards(false)}}>Add</button>
        </div>

    </div>
    
    
    </>
  )
}
