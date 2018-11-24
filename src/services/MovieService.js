//const API_KEY = "612c3338";
const API_KEY = '772550390f45ddb8fbac999e8b90ad9e';

/* if (search === "") {
    return fetch('http://www.omdbapi.com/?apikey=' + API_KEY + '&s=star&page=' + page)
        .then(response => response.json())
        .then(myJson => {return myJson.Search});
} else {
    return fetch('http://www.omdbapi.com/?apikey=' + API_KEY + '&s=' + search + '&page=' + page)
        .then(response => response.json())
        .then(myJson => {return myJson.Search});
} */

const loadMoviesData = async (type, query, page) => {
    if (type === "popular" || query === "") {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(myJson => {return myJson.results});
    } else if (type === "search") {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(myJson => {return myJson.results});
    } else if (type === "recommended") {
        const url= `https://api.themoviedb.org/3/movie/${query}/recommendations?api_key=${API_KEY}&page=${page}`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(myJson => {return myJson.results});
    }
} 

class MovieService {
    static getPopularMovies = async (query = "", page = 1) => {
        try {
            var res = await loadMoviesData("popular", query, page);
            console.log("popular: ", res);
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    static getSearchMovies = async (query, page = 1) => {
        try {
            var res = await loadMoviesData("search", query, page);
            console.log("search: ", res);
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    static getRecommendedMovies = async (query, page = 1) => {
        try {
            var res = await loadMoviesData("recommended", query, page);
            return res;
        } catch (err) {
            console.log(err);
        }
    }
}

export default MovieService;