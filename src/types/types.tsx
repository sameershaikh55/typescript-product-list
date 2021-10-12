export type requestType = {
	method: string;
	url: string;
	params: {
		q: string;
		brand: string;
		priceMax: string;
		currency: string;
		lang: string;
	};
	headers: { "x-rapidapi-host": string; "x-rapidapi-key": string };
};
