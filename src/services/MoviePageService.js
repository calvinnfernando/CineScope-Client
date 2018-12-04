import MovieService from './MovieService'
import MovieFirebaseService from './MovieFirebaseService'

/**
 * An extra abstraction layer which prevents MoviePage/index.js from having to access MovieService.
 */

class MoviePageService {
    static setUpMovieData(refToMoviePage, movieID) {
        /**
         * This method get single movie data from TMDb
         */
        MovieService.getSingleMovie(movieID).then((movie) => {
            const year = movie.release_date.split("-")[0];
            const imdb_id = movie.imdb_id;
            refToMoviePage.setState({
                movie_id: movieID,
                title: movie.title,
                overview: movie.overview,
                poster: movie.poster_path,
                year: year,
                imdb_id: imdb_id
            });

            /**
             * This method get single movie data from OMDb
             */
            MovieService.getSingleMovieOMDb(imdb_id).then((movie) => {
                const ratings = movie.Ratings;
                var rottenTomatoes = "N/A";
                for (const source of ratings) {
                    if (source.Source === "Rotten Tomatoes") {
                        rottenTomatoes = source.Value;
                    }
                }
                var rated = movie.Rated;
                if (rated === "N/A" || rated === "NOT RATED") {
                    rated = "Not yet rated";
                }
                refToMoviePage.setState({
                    director: movie.Director,
                    actors: movie.Actors,
                    runtime: movie.Runtime,
                    rated: rated,
                    rotten_tomatoes: rottenTomatoes,
                    metascore: movie.Metascore,
                    imdb_rating: movie.imdbRating
                });
            });
        });

        /**
         * This method get similar movies based on the movie page
         *
         * @param {const} movieID
         */
        MovieService.getSimilarMovies(movieID).then((movies) => {
            const relatedMovies = movies.slice(0, 4);
            refToMoviePage.setState({ relatedMovies: relatedMovies });
        });

        /**
         * This method get movie trailer based on movie id
         *
         * @param {const} movieID
         */
        MovieService.getMovieVideos(movieID).then((videos) => {
            var trailerVideo = "";
            for (const video of videos) {
                if (video.type === "Trailer" && video.site === "YouTube") {
                    trailerVideo = video;
                    break;
                }
            }
            refToMoviePage.setState({ trailerVideo: trailerVideo });
        })
        /**
         * This method gets movie reviews from Firebase
         */
        MovieFirebaseService.getReviews(refToMoviePage, movieID);

        /**
         * This method gets movie reviews from TheMovieDB
         */
        MovieService.getMovieReviews(movieID).then((reviews) => {
            const movieReviews = reviews.slice(0, 8);
            console.log(movieReviews)
            refToMoviePage.setState({ reviews: movieReviews });
        });

        /** 
         * This method gets movie rating from Firebase
         */
        MovieFirebaseService.getRating(refToMoviePage, movieID);

        MovieFirebaseService.updateWatchListExistence(refToMoviePage, movieID);
    }

}

export default MoviePageService;