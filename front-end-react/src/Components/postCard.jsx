import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
export default function PostCard({ data }) {
    if (!data || !data.post) {
        return <p>Loading...</p>
    }
    console.log(data)
    return (
        <div className='container'>
            {/* <FontAwesomeIcon icon={faImage} /> */}
            {data.post.map((el) => {
                return (
                    <div className='post-container' key={el.id}>
                        <div className='img-container'>
                            <img src={el.featured_media} className='post-img' />
                        </div>
                        <div className='text-container'>
                            <h2>{el.title}</h2>
                            <p>{el.content}</p>
                            <div>{el.modified_gmt}</div>
                            <a href={el.link} className='view-post-btn' target='_blank'>View</a>
                        </div>
                    </div>
                )
            })}


        </div>
    )
}
