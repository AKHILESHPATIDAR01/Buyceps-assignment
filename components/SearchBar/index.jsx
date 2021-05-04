import React, { useEffect, useState } from "react";

export default function SearchBar( { setSerachTitle , setsearchYear ,setSearchId ,setDisplayData,setPageNumber } ) {
	const [titleInput, setTitleInput]=useState("");
	const [yearInput, setYearInput]=useState("");
	const [idInput, setIdInput]=useState("");
	const [blankState , setBlankState]= useState([]);

	const handleSubmit = (e)=>{
		e.preventDefault();
		if(titleInput !== ""){
			setSerachTitle(titleInput);
			setSearchId(idInput);
			setsearchYear(yearInput);
		}
		else{
			
		}
		
		console.log(titleInput , yearInput , idInput  );
	}

	return (
		<div className="relative shadow-lg my-10 p-5 rounded-md mx-5">
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}>
				<div className="field-group grid grid-cols-2 md:grid-cols-4 gap-4 ">
					<input
						type="search"
						name="s"
						className="py-2 text-sm col-span-2 md:col-auto text-gray-600 bg-gray-100 rounded-md px-2  focus:outline-none focus:ring focus:border-purple-600 focus:bg-white focus:text-gray-900"
						placeholder="Search Title"
						autoComplete="off"
						onChange={ e => setTitleInput(e.target.value) }
					/>
					<input
						type="search"
						name="y"
						className="py-2 text-sm text-gray-600 bg-gray-100 rounded-md px-2  focus:outline-none focus:ring focus:border-purple-600 focus:bg-white focus:text-gray-900"
						placeholder="Year"
						autoComplete="off"
						onChange={ e => setYearInput(e.target.value) }
					/>
					<input
						type="search"
						name="i"
						className="py-2 text-sm  text-gray-600 bg-gray-100 rounded-md px-2  focus:outline-none focus:ring focus:border-purple-600 focus:bg-white focus:text-gray-900"
						placeholder="ID"
						autoComplete="off"
						onChange={ e => setIdInput(e.target.value) }
					/>
					<button
						type="submit"
						className=" search-btn text-white font-bold p-1 rounded col-span-2 md:col-auto bg-yellow-400 focus:outline-none focus:shadow-outline"
						onClick={handleSubmit}  >
						Search
					</button>
				</div>
			</form>
		</div>
	);
}
