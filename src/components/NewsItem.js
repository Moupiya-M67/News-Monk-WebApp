import React from 'react'

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, author, date } = props;
    return (
        <div className="my-3 mx-3">
            <div className="card">
                <img src={!imageUrl ? "https://images.hindustantimes.com/img/2021/10/05/1600x900/1920_Panel12_Picture_Devices_1633397616397_1633397627263.jpg" : imageUrl} className="card-img-top" alt="img" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
