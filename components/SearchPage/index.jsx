import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { BrowserRouter , Switch , Route, Link } from 'react-router-dom';
import Data from '../../public/sampleData.json'
import { data } from "autoprefixer";
const SearchBar = dynamic(() => import("../SearchBar"));

export default function SearchPage(props) {
	const [displayData, setDisplayData] = useState([]);
	const [pageNumber , setPageNumber] = useState(1);
	const [serachTitle , setSerachTitle] = useState("Golmaal");
	const [searchYear , setsearchYear] = useState();
	const [searchId , setSearchId] = useState("tt10888594");

	// console.log(Data.Search);


	const fetchData = async(pageNumber) =>{
		// const result = await fetch(`http://www.omdbapi.com/?apikey=b29ea5a1&t={title}&y={year}&i={id}`)
		if (window.location.protocol === 'http:'){
			const result = await fetch(`http://www.omdbapi.com/?apikey=b29ea5a1&s=${serachTitle}&y=${searchYear}&i=${searchId}&plot=full`);
			const newData = await result.json();
			console.log("fetched Data :",newData.Search);
			setDisplayData(newData.Search);
		}
		else{
			const result = await fetch(`https://www.omdbapi.com/?apikey=b29ea5a1&s=${serachTitle}&y=${searchYear}&i=${searchId}&plot=full`);
			const newData = await result.json();
			console.log("fetched Data :",newData.Search);
			setDisplayData(newData.Search);
		}
		
		
	}

	useEffect(()=>{
		fetchData(pageNumber);
		console.log("Search Title :",serachTitle);
	},[pageNumber , serachTitle ,searchId ,searchYear]);

	return (
		<>  
			<p className="text-center my-10 text-3xl font-medium">Explore movies</p>
			<div className="boxed">
				<SearchBar setSerachTitle={setSerachTitle}  setsearchYear={setsearchYear} setSearchId={setSearchId}  />
        		{/* Display Search results here */}
				
				<div className="display-items">
					{displayData.map((item)=>{
						return(
							<div className='display-card' key={item.imdbID}>
								<div className='display-img-portion'>
									<img src={item.Poster} />
								</div>
								<div className='display-detail-portion'>
									<h1 className="display-title">
										{ item.Title.length <20 ? item.Title : null }
									</h1>
									<h1 className="display-heading">Directed by :<br></br><span>{item.Year}</span></h1>
									<h1 className="display-heading">IMDB : <br></br><span>{item.imdbID}</span></h1>
									<div className='display-lastline'>
										<h1 className="display-heading">Type : <br></br><span>{item.Type}</span></h1>
										
										<Link to={`/singlepage/${item.Title}`}>
											<a href="" className="morebtn">more</a>
										</Link>
										
									</div>
									
								</div>
								{/* <div className="display-card-hover">
									{item.Title}
								</div> */}
							</div>
						);
					})}
				</div>

				

				{/* { displayData.length == 0 ?  <p>Please fill correct value</p>
				:
					displayData.map((item)=>{
						return(
							<h1>{item.Title}</h1>
						);
					})
				} */}


			</div>
			
		</>
	);
}
