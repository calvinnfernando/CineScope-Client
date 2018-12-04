import MovieService from './MovieService'
import FirebaseService from './FirebaseService'
import showdown from 'showdown'
import {markdown} from 'markdown'

/**
 * An extra abstraction layer which prevents MoviePage/index.js from having to access MovieService.
 */

class MoviePageService {
    static getCurrentUser (refToPage) {
        FirebaseService.getCurrentUser(refToPage);
    }

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
        FirebaseService.getReviews(refToMoviePage, movieID);

        /**
         * This method gets movie reviews from TheMovieDB
         */
        MovieService.getMovieReviews(movieID).then((reviews) => {
            const movieReviews = reviews.slice(0, 8);
            for (var movieReview of movieReviews) {
                // convert markdown to HTML before adding it to our state  
                var contentHtml = markdown.toHTML(movieReview.content);
                movieReview.content = contentHtml;
            }
            var newReviews = refToMoviePage.state.reviews.concat(movieReviews)
            refToMoviePage.setState({ reviews: newReviews });
        });

        /** 
         * This method gets movie rating from Firebase
         */
        FirebaseService.getRating(refToMoviePage, movieID);

        FirebaseService.updateWatchListExistence(refToMoviePage, movieID);
    }

    static toggleWatchList(refToPage, list, movieID, poster, title, overview, imdb_id) {
        FirebaseService.toggleWatchList(refToPage, list, 'moviePage', movieID, poster, title, overview, imdb_id);
    }

    static uploadReview(refToPage) {
        if (!refToPage.state.currentUser) {
            refToPage.signInNotification();
            return;
          }
          // console.log(this.state.reviewText)
          if (refToPage.state.reviewText === '') {
            refToPage.setState({ emptyReview: true });
            return;
          }
      
          FirebaseService.uploadReview(refToPage, refToPage.state.reviewText);
    }

    static rateMovie(refToPage) {
        if (!refToPage.state.currentUser) {
            refToPage.signInNotification();
            return;
          }
      
          if (refToPage.state.dropdownValue == 0) {
            refToPage.setState({ invalidRating: true });
            return;
          }
      
          var rating = refToPage.state.dropdownValue;
          refToPage.setState({ ratingPostedMessage: true });
      
          FirebaseService.updateRating(refToPage.state.movie_id, rating);
    }

}

export default MoviePageService;