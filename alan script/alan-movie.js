intent(`(Hello|Hi)`, p => {
	p.play(`(Hi|hello) there, I am Alan.`);
    p.play(`How can I help you.`);
})

const APIKEY = "b6d1627d45cef30c68b54c63da1c3226";
const TMDB = "https://api.themoviedb.org/3/discover/movie";

// Add objects
let videoList = [];
let savedMovies = [];
onCreateProject(() => {
	const request_url = `${TMDB}?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&page=1`;
	api.axios.get(request_url)
		.then((response) => {
			let data = response.data;
			console.log(data);

			// Push video titles and IDs to videoList
			data.results.forEach(element => {
				videoList.push(element.title.replace(/[^a-zA-Z ]/g, "") + '~' + element.id);
			});

			// Join the videoList values
			project.videos = videoList.join('|');
			savedMovies = data;
		})
    .catch((error) => {
        console.log(error);
    });
});
intent(`What are the (top|best|most popular) movies (now|today|)?`, p => {
	p.play(`Here are the top 20 movies.`);
    p.play({
			command: "showMovie",
			list: savedMovies.results
		})
    p.play('Would you like me to read the movie titles?');
    p.then(confirmation);
    
});

const confirmation = context(() =>{
    intent('yes',async(p) =>{
        for (let i = 0; i < 20; i++) {
            p.play({command: 'highlight', list: savedMovies.results[i]});
            p.play(`${savedMovies.results[i].title}`)
	}  
        p.play('You may click Know More to get movie details or say go back to return to main page.');
    })
    intent('no',(p) =>{
        p.play('Sure,sounds good.')
        p.play('You may click Know More to get movie details or say go back to return to main page.');
    })
})
intent('go back', (p) => {
    p.play('Okay, going back.');
    p.play({command: 'showMovie', list:[]})
    p.play('Thank you, have a nice day ahead.');
})
