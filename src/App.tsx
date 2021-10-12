import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { requestType } from "./types/types";
import { HashLoader } from "react-spinners";

function App() {
	const [data, setData] = useState<any>();
	const [loader, setLoader] = useState<boolean>(false);
	const [changeEvent, setChangeEvent] = useState<any>({
		name: "",
		brand: "",
		price: "",
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setChangeEvent({
			...changeEvent,
			[name]: value,
		});
		setLoader(true);
		axios
			.request<requestType>({
				method: "GET",
				url: "https://asos2.p.rapidapi.com/products/v2/list",
				params: {
					q:
						(name === "name" && value) ||
						(changeEvent.name !== "" && changeEvent.name) ||
						"All",
					brand:
						(name === "brand" && value) ||
						(changeEvent.brand !== "" && changeEvent.brand) ||
						"",
					priceMax:
						(name === "price" && Number(value)) ||
						(changeEvent.price !== "" && Number(changeEvent.price)) ||
						"",
					priceMin: 0,
					currency: "USD",
					lang: "en-US",
				},
				headers: {
					"x-rapidapi-host": "asos2.p.rapidapi.com",
					"x-rapidapi-key":
						"624eb778abmsh4b3a77f9a29a101p15223ejsn7f4516080790",
				},
			})
			.then(function (response) {
				setData(response);
				setLoader(false);
			})
			.catch(function (error) {
				console.error(error);
			});
		console.log(Number(value));
	};

	useEffect(() => {
		if (
			changeEvent.name === "" ||
			changeEvent.brand === "" ||
			changeEvent.price === ""
		) {
			setLoader(true);
			axios
				.request<requestType>({
					method: "GET",
					url: "https://asos2.p.rapidapi.com/products/v2/list",
					params: {
						q: "All",
						brand: "",
						priceMax: "",
						priceMin: "",
						currency: "USD",
						lang: "en-US",
					},
					headers: {
						"x-rapidapi-host": "asos2.p.rapidapi.com",
						"x-rapidapi-key":
							"624eb778abmsh4b3a77f9a29a101p15223ejsn7f4516080790",
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
				<h2>Filters:</h2>
				<div className="search_fields">
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
				<br />
				<br />
				{data && (
					<div className="card_container">
						{data.data.products.map((prev: any, i: number) => {
							const {
								imageUrl,
								name,
								price: {
									current: { text },
								},
							} = prev;
							return (
								<div key={i} className="card">
									<img src={"https://" + imageUrl} alt="" />
									<p>{name}</p>
									<h3>{text}</h3>
								</div>
							);
						})}
					</div>
				)}
				{loader && (
					<div className="loading_get">
						<div>
							<HashLoader size={80} color="#000" />
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default App;
