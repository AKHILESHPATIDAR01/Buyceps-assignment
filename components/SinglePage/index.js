import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router'

function SinglePage() {
    const { title } = useParams()
    const [singleMovieData , setSingleMovieData] = useState([]);

    console.log("title as a param ",title);

    const fetchDataSingle = async() =>{
		// const result = await fetch(`http://www.omdbapi.com/?apikey=b29ea5a1&t={title}&y={year}&i={id}`)
		if (window.location.protocol === 'http:'){
			const result = await fetch(`http://www.omdbapi.com/?apikey=b29ea5a1&t=${title}&plot=full`);
			const newData = await result.json();
			console.log("fetched Data :",newData);
			setSingleMovieData(newData);
		}
		else{
			const result = await fetch(`https://www.omdbapi.com/?apikey=b29ea5a1&t=${title}&plot=full`);
			const newData = await result.json();
			console.log("fetched Data :",newData.Search);
			setSingleMovieData(newData.Search);
		}
		
		
	}

    useEffect(()=>{
        fetchDataSingle();
    },[]);

    // useEffect(()=>{
	// 	fetchDataSingle();
	// },[pageNumber , serachTitle ,searchId ,searchYear]);

    return (
        <div>
           <div className="homeBtn">
           <Link to='/'>
                <button>Home</button>
            </Link>
           </div>
            
            <div className="singlePage-container">
                <div className="singlePage-Heading">
                    <div className="s-p-poster">
	    <img src="" alt="imagsdgs" />
	    { /*  <img src={singleMovieData.Poster} alt="imagsdgs" /> */}

	    </div>
                    <div className="s-p-name">
                        <div className="s-p-top">
                            <div>
                                <h1 className='s-p-name-large'>{singleMovieData.Title}</h1>
                                <h1 className='s-p-name-small'>Directed By : {singleMovieData.Director}</h1>
                            </div>
                            <div>
                                <h1 className='s-p-name-small-sm'>{singleMovieData.Runtime}   |   {singleMovieData.Genre}   |   {singleMovieData.Language}</h1>
                            </div>
                        </div>

                    </div>
                    <div className="s-p-rating">
                        <div className='ratingBox'>
                        {/* { 
                         singleMovieData.Ratings.map((item)=>{
                            return(
                                <div className='box'>
                                    <p className="ratingVal">{item.Value}</p>
                                    { item.Source == "Internet Movie Database" ?<p className="sourceName">IMDB</p> : <p className="sourceName">{item.Source}</p>  } 
                                </div>
                            );
                        })  } */}
                        </div>
                    </div>
                </div>
                <div className="singlePage-Plot">
                    <div className="singlePage-Plot-head">Plot:</div>
                    <div className="singlePage-Plot-desc">{singleMovieData.Plot}</div>
                </div>

                <div className="singlePage-Crew">
                    
                    <div className="singlePage-Crew-desc">
                        <div className="singlePage-Crew-desc-box">
                            <p className="xx">Type</p>
                            <p className="xy">{singleMovieData.Type}</p>
                        </div>
                        <div className="singlePage-Crew-desc-box">
                            <p className="xx">Country</p>
                            <p className="xy">{singleMovieData.Country}</p>
                        </div>
                        <div className="singlePage-Crew-desc-box">
                            <p className="xx">Directed By</p>
                            <p className="xy">{singleMovieData.Director}</p>
                        </div>

                        <div className="singlePage-Crew-desc-box">
                            <p className="xx">Released On</p>
                            <p className="xy">{singleMovieData.Released}</p>
                        </div>
                        
                        <div className="singlePage-Crew-desc-box">
                            <p className="xx">BoxOffice</p>
                            <p className="xy">{singleMovieData.BoxOffice}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePage;
