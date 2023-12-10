import { mainColors } from "./theme";

export const graphInfo = {
	pieChart: {
		heading: "Script Type Distribution Based on the Year",
		content:
			"A script's strength typically determines a film's success, making it a cornerstone in the ever-changing world of filmmaking. Scripts are the foundation of the film industry, acting as a blueprint for storytelling.  A well-crafted script ensures a unified and interesting narrative, impacting the emotional effect of the audience. This graph depicts the number of different script types used in films produced that year.",
		dimensions: {
			width: 350,
			height: 350,
			margin: 30,
		},
	},
	connectedScatterChart: {
		heading: "Audience V/S Critic Deviation",
		content: "",
		dimensions: {
			width: 500,
			height: 350,
		},
	},
	groupBarChart: {
		heading: "Genre Performances on International V/S Domestic Box-Office",
		content:
			" In the domestic and international box office, film genres take different paths, reflecting varying audience tastes. The action and superhero genres frequently thrive on a global scale, whereas romantic comedies influenced by cultural differences may perform well in home markets. Understanding genre dynamics is essential for filmmakers to appeal to a wider audience. This graph contrasts the domestic and international box office performance of various major genres.",
		legend: [
			{ id: 1, label: "International Gross", color: "red-main" },
			{ id: 2, label: "Domestic Gross", color: "orange-main" },
		],
		labels: {
			x: "Earnings in Millions ($)",
		},
		dimensions: {
			width: 650,
			height: 350,
			margin: { top: 30, right: 10, bottom: 50, left: 70 },
		},
	},
	stackedBarChart: {
		heading:
			"Highest Grossing Movies Worldwide with opening weekend collection V/S Rotten Tomato ratings",
		content:
			"While box office receipts indicate a film's commercial success, critics can shape its reputation.  While a blockbuster may draw a large audience, a negative critical response can ruin its legacy. This graph demonstrates that a film's box office performance does not guarantee that it will be critically acclaimed. Some movies do well after their first weekend because word of mouth spreads.",
		legend: [
			{ id: 1, label: "Worldwide Gross", color: "orange-main" },
			{ id: 2, label: "Opening Weekend Gross", color: "red-main" },
		],
		labels: {
			y: "Earnings in Millions ($)",
			x: "Rotten Tomato's Rating (%)",
		},
		dimensions: {
			width: 750,
			height: 350,
			margin: { top: 30, right: 30, bottom: 50, left: 70 },
		},
	},
	fullHeatMap: {
		heading: "Heat map for IMDB rating V/S year of release",
		content: "",
		dimensions: {
			width: 1850,
			height: 140,
			margin: { top: 20, right: 30, bottom: 10, left: 30 },
		},
	},
	fullBarGraph: {
		dimensions: {
			width: 1850,
			height: 140,
			margin: { top: 20, right: 30, bottom: 10, left: 30 },
		},
	},
	zoomOverlayChart: {
		dimensions: {
			width: 1500,
			height: 700,
			margin: { top: 30, left: 30, right: 30, bottom: 30 },
		},
	},
	genreShiftChart: {
		heading: "Genre shift on the basis of number of movies released each year",
		content:
			"The cinematic landscape has seen intriguing genre shifts over time, reflecting societal evolution and audience tastes.Technological advancements have propelled the sci-fi genre to new heights, while romantic dramas have maintained their popularity. Furthermore, this genre shift is influenced not only by technological or cultural shifts, but also by changing storytelling trends.  We want to see if there are any patterns in the genre shift, or if there is a specific genre that is still loved by the audience as much as it was before.",
		dimensions: {
			width: 750,
			height: 250,
			margin: { top: 30, right: 30, bottom: 50, left: 50 },
		},
		labels: {
			y: "Num. of Movies",
		},
	},
	runtimeShiftChart: {
		heading:
			"Runtime shift on the basis of average runtime for movies released each year",
		content:
			"The length of movies has changed noticeably over the years, reflecting changing audience preferences and industry dynamics. While early cinema often featured shorter films, modern audiences have embraced longer runtimes. Streaming platforms have further blurred traditional time constraints, allowing for both concise narratives and extended explorations. This evolution demonstrates the industry's adaptability to various storytelling formats, accommodating varying attention spans and narrative complexities in response to shifting viewing habits.",
		labels: {
			y: "Avg. Runtime(in mins)",
		},
		legend: [
			{
				id: 1,
				label: "Comedy",
				color: "blue-main",
				colorCode: mainColors["blue-main"],
			},
			{
				id: 2,
				label: "Action",
				color: "green-main",
				colorCode: mainColors["green-main"],
			},
			{
				id: 3,
				label: "Adventure",
				color: "yellow-main",
				colorCode: mainColors["yellow-main"],
			},
			{
				id: 4,
				label: "Drama",
				color: "pink-main",
				colorCode: mainColors["pink-main"],
			},
			{
				id: 5,
				label: "Romance",
				color: "purple-main",
				colorCode: mainColors["purple-main"],
			},
		],
		dimensions: {
			width: 750,
			height: 250,
			margin: { top: 30, right: 30, bottom: 50, left: 50 },
		},
	},
};
