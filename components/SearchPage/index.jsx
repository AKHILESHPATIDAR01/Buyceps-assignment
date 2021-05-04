import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { BrowserRouter , Switch , Route, Link } from 'react-router-dom';
// import Data from '../../public/sampleData.json'
const SearchBar = dynamic(() => import("../SearchBar"));

export default function SearchPage(props) {
	const [displayData, setDisplayData] = useState([]);
	const [pageNumber , setPageNumber] = useState(1);
	const [serachTitle , setSerachTitle] = useState("Batman");
	const [searchYear , setsearchYear] = useState();
	const [searchId , setSearchId] = useState("tt10888594");



	const fetchData = async(pageNumber) =>{
		// const result = await fetch(`http://www.omdbapi.com/?apikey=b29ea5a1&t={title}&y={year}&i={id}`)
		if (window.location.protocol === 'http:'){
			const result = await fetch(`http://www.omdbapi.com/?apikey=b29ea5a1&s=${serachTitle}&y=${searchYear}&page=${pageNumber}&plot=full`);
			const newData = await result.json();
			console.log("fetched Data :",newData.Search);
			// setDisplayData(newData.Search);
			if(newData.Search != undefined){
				var prev = "";
				if(displayData.length > 0){
					prev =  displayData[0].Title;
				}
				console.log(" Previous Tile", prev);
				console.log(" updated Tile", serachTitle);

				if(prev.toLowerCase().includes(serachTitle.toLowerCase())){
					setDisplayData( [...displayData,...newData.Search]);
				}
				else{
					setDisplayData( [...newData.Search]);	
				}
			}
			else{
				setDisplayData(displayData);
			}
			
		}
		else{
			const result = await fetch(`https://www.omdbapi.com/?apikey=b29ea5a1&s=${serachTitle}&y=${searchYear}&page=${pageNumber}&plot=full`);
			const newData = await result.json();
			console.log("fetched Data :",newData.Search);
			if(newData.Search != undefined){
				setDisplayData( [...displayData,...newData.Search]);
			}
			else{
				setDisplayData(displayData);
			}
		}
		
		
	}

	useEffect(()=>{
		window.addEventListener('scroll', handleOnScroll);
		fetchData(pageNumber);
		console.log("Search Title :",serachTitle);
		console.log("Fetch Data CALLED");
	},[pageNumber , serachTitle ,searchId ,searchYear]);

	const handleOnScroll=()=>{
		var scrollTop = document.documentElement.scrollTop;
		console.log("scrollTop",scrollTop);
		var scrollHeight = document.documentElement.scrollHeight;
		console.log("scrollHeight",scrollHeight);
		var clientHeight = document.documentElement.clientHeight;
		console.log("clintHeight",clientHeight);
		var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

		if (scrolledToBottom) {
		 loadMore();
		}
	}
	

	const loadMore = ()=>{
		setPageNumber(pageNumber+1);
		console.log("LOADMORE CALLED");
	}

	
	

	return (
		<>  
			<p className="text-center my-10 text-3xl font-medium">Explore movies</p>
			<div className="boxed">
				<SearchBar setSerachTitle={setSerachTitle}  setsearchYear={setsearchYear} setSearchId={setSearchId} setPageNumber={setPageNumber} />
        		{/* Display Search results here */}
				
				<div className="display-items" >
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
							</div>
						);
					})}
					<h1>{pageNumber}</h1>
					<button onClick={loadMore} >Load More</button>			
				</div>
			</div>
		</>
	);
}
