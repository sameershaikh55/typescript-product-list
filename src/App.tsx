import { useEffect, useState } from "react";

// AXIOS IMPORT
import axios from "axios";

// CSS IMPORT
import "./App.css";

// LOADER IMPORT
import { HashLoader } from "react-spinners";

// TYPE IMPORT
import { requestType } from "./types/types";

function App() {
	// API DATA STATE
	const [data, setData] = useState<any>();

	// LOADER STATE
	const [loader, setLoader] = useState<boolean>(false);

	// INPUT CHANGE STATE
	const [changeEvent, setChangeEvent] = useState<any>({
		name: "",
		brand: "",
		price: "",
	});

	// INPUT CHANGE FUNCTION
	const handleChange = (e: any) => {
		const { name, value } = e.target;

		// ONCHANGE EVENT
		setChangeEvent({
			...changeEvent,
			[name]: value,
		});
		// LOADER TRUE
	};

	const handleClick = () => {
		setLoader(true);

		// INPUT CHANGE API CALL
		axios
			.request<requestType>({
				method: "GET",
				url: "https://asos2.p.rapidapi.com/products/v2/list",
				params: {
					q:
						(changeEvent.name !== "" && `${changeEvent.name}, women`) ||
						"women",
					brand: (changeEvent.brand !== "" && changeEvent.brand) || "",
					priceMax:
						(changeEvent.price !== "" && Number(changeEvent.price)) || "",
					priceMin: 0,
					currency: "USD",
					lang: "en-US",
					limit: 10000,
					sort: "women",
				},
				headers: {
					"x-rapidapi-host": "asos2.p.rapidapi.com",
					"x-rapidapi-key":
						"38039e2116msh44473e9add12f62p1728f4jsn7e717ace616a",
				},
			})
			.then(function (response) {
				setData(response);
				setLoader(false);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	useEffect(() => {
		// CONDITION TO LOAD DATA
		if (
			changeEvent.name === "" ||
			changeEvent.brand === "" ||
			changeEvent.price === ""
		) {
			setLoader(true);

			// API CALL ON LOAD
			axios
				.request<requestType>({
					method: "GET",
					url: "https://asos2.p.rapidapi.com/products/v2/list",
					params: {
						q: "women",
						brand: "",
						priceMax: "",
						priceMin: "",
						currency: "USD",
						lang: "en-US",
						limit: 10000,
						sort: "women",
					},
					headers: {
						"x-rapidapi-host": "asos2.p.rapidapi.com",
						"x-rapidapi-key":
							"38039e2116msh44473e9add12f62p1728f4jsn7e717ace616a",
					},
				})
				.then(function (response) {
					setLoader(false);
					setData(response);
				})
				.catch(function (error) {
					console.error(error);
				});
		}
	}, []);

	return (
		<>
			<div className="page_container">
				{/* // FILTER START */}
				<h2>Filters:</h2>
				<div className="search_fields">
					{/* // NAME INPUT */}
					<div className="col">
						<label htmlFor="">Name</label>
						<br />
						<input
							name="name"
							type="text"
							value={changeEvent.name}
							onChange={(e) => handleChange(e)}
							placeholder="Enter the Name"
						/>
					</div>

					{/* // BRAND INPUT */}
					<div className="col">
						<label htmlFor="">Brand</label>
						<br />
						<input
							name="brand"
							type="text"
							value={changeEvent.brand}
							onChange={(e) => handleChange(e)}
							placeholder="Enter the Brand"
						/>
					</div>

					{/* // PRICE INPUT */}
					<div className="col">
						<label htmlFor="">Price</label>
						<br />
						<input
							name="price"
							type="number"
							value={changeEvent.price}
							onChange={(e) => handleChange(e)}
							placeholder="Enter the Price"
						/>
					</div>
				</div>
				{/* // FILTER END */}

				<br />

				<div className="btn_cont">
					<button onClick={handleClick}>Submit</button>
				</div>

				<br />
				<br />

				{/* // LIST START */}
				{data && (
					<div className="card_container">
						{data.data.products.map((prev: any, i: number) => {
							// DESTRUCTION
							const {
								imageUrl,
								name,
								price: {
									current: { text },
								},
							} = prev;
							return (
								// EACH CARD
								<div key={i} className="card">
									<img src={"https://" + imageUrl} alt="" />
									<p>{name}</p>
									<h3>{text}</h3>
								</div>
							);
						})}
					</div>
				)}
				{/* // LIST END */}

				{/* // LOADER CONDITION START */}
				{loader && (
					<div className="loading_get">
						<div>
							<HashLoader size={80} color="#000" />
						</div>
					</div>
				)}
			</div>
			{/* // LOADER CONDITION END */}
		</>
	);
}

export default App;
