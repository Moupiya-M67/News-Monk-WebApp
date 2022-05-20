import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)



    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // setState({ loading: true }); 
        setLoading(true); //by me
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);
    }
    //async componentDidMount() {
    // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=10c23cbb27ec46a095cfbd60d10b71d1&page=1&pageSize=${props.pageSize}`;
    // setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // setState({ 
    //     articles: parsedData.articles, 
    //     totalResults: parsedData.totalResults,
    //     loading: false
    //  })

    //updateNews();
    // }

    // handlePrevClick = async () => {
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=10c23cbb27ec46a095cfbd60d10b71d1&page=${page - 1}&pageSize=${props.pageSize}`;
    // setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // setState({
    //     page: page - 1,
    //     articles: parsedData.articles,
    //     loading:false
    // })

    // setState({ page: page - 1 });
    // updateNews();

    // }

    // handleNextClick = async () => {

    //console.log("Next");
    // if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=10c23cbb27ec46a095cfbd60d10b71d1&page=${page + 1}&pageSize=${props.pageSize}`;
    //     setState({loading: true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     setState({
    //         page: page + 1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })
    // }

    // setState({ page: page + 1 });
    // updateNews();
    // }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - newsMonk`;
        updateNews();
        //eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)

    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <>
            <h2 className="text-center" style={{ margin: '40px 0px', marginTop: '100px' }}>Daily News - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container my-3">
                    <div className="row my-4">
                        {
                            articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                                //.slice(0,45)
                            })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &#8592; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &#8594;</button>
                </div> */}
        </>
    )

}

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News

//10c23cbb27ec46a095cfbd60d10b71d1