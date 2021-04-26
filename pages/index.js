import Head from "next/head";
import dynamic from "next/dynamic";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { createMemoryHistory } from 'history';
const SearchPage = dynamic(() => import("../components/SearchPage"));
const SinglePage = dynamic(() => import("../components/SinglePage"));


export default function Home(props) {
	const history = createMemoryHistory();
	return (
		<>
			<Router history={history}>
				<Head>
					<title>OMDB movies</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Switch>
					<Route path='/' exact>
						<SearchPage />
					</Route>
				</Switch>

				<Switch>
					<Route path='/singlepage/:title' exact>
						<SinglePage />
					</Route>
				</Switch>


			</Router>
		</>
	);
}


