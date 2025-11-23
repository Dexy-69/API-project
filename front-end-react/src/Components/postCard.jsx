

export default function InfoCard({ data }) {
    if (!data || !data.post) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div className="card-container">
                {data.post.map((el, index) => {
                    return (
                        <div className="card" key={index} id={index}>
                            <h2>{data.name}</h2>
                            <p>{el.post_title}</p>
                        </div>
                    )
                })}
            </div>

        </>
    )
}
