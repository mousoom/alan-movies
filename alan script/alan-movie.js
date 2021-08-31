intent(`(Hello|Hi)`, p => {
	p.play(`(Hi|hello) there, I am Alan.`);
    p.play(`How can I help you.`);
})

const APIKEY = "b6d1627d45cef30c68b54c63da1c3226";
const TMDB = "https://api.themoviedb.org/3/discover/movie";

// Add objects
let videoList = [];
let savedMovies = [];
let savedVideo = [];
onCreateProject(() => {
	const request_url = `${TMDB}?api_key=${APIKEY}&language=en-US&sort_by=popularity.desc&page=1&include_video=true`;
    console.log(request_url)
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
    p.play({
			command: "showMovie",
			list: savedMovies.results
		})
    p.play(`Here are the top 20 movies.`);
    p.play('Would you like me to read the movie titles?');
    p.then(confirmation);
    
});
follow(`Tell me about $(MOVIE p:videos)`, p => {
    p.play(`Here is something about ${p.MOVIE.value}:`)
    let result = savedMovies.results.find(el => el.id === parseInt(p.MOVIE.label, 10));
    p.play(`${result.overview}`);
    console.log(result)
});
intent('open (movie|) (number|) $(number* (.*))', (p) => {
    if(p.number.value) {
        p.play({ command:'open', number: p.number.value, list: savedMovies.results})
    }
})
intent(`play trailer for $(MOVIE p:videos)`, p => {
    let result = ""
    result = savedMovies.results.find(el => el.id === parseInt(p.MOVIE.label, 10));
    p.play({ command:'play', video: result})

});


const confirmation = context(() =>{
    intent('yes',async(p) =>{
        for (let i = 0; i < 20; i++) {
            p.play({command: 'highlight', list: savedMovies.results[i]});
            p.play(`${savedMovies.results[i].title}`)
	}  
    })
    intent('no',(p) =>{
        p.play('Sure,sounds good.')
    })
})
intent('go back', (p) => {
    p.play('Okay, going back...');
    p.play({command: 'showMovie', list:[]})
})
