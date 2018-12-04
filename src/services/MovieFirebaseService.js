import firebase from 'firebase';

class MovieFirebaseService {

    static getCurrentUser = async (refToMoviePage) => {

        firebase.auth().onAuthStateChanged(user => {
            console.log('in here');
            if (user) {
                refToMoviePage.setState({ currentUser: user.uid })
            } else {
            }
        });
    }

    static getRating(refToMoviePage, movieID) {
        var ratingRef = firebase.database().ref('movies/' + movieID);
        ratingRef.on('value', function (snapshot) {
            var firebaseRating = snapshot.val();
            if (firebaseRating) {
                refToMoviePage.setState({ vote_average: firebaseRating.rating });
            }
        });
    }

    static updateRating(movieID, rating) {
        var ratingRef = firebase.database().ref('movies/' + movieID);
        var newNumberOfRatings = 0;
        var newSumOfRatings = 0;
        ratingRef.on('value', function (snapshot) {
            var firebaseRating = snapshot.val();
            if (firebaseRating) {
                if (firebaseRating.numberOfRatings) {
                    newNumberOfRatings = firebaseRating.numberOfRatings;
                }
                else {
                    newNumberOfRatings = 0;
                }
                if (firebaseRating.sumOfRatings) {
                    newSumOfRatings = firebaseRating.sumOfRatings;
                }
                else {
                    newSumOfRatings = 0;
                }
            }
        });

        // increase the number of ratings so far
        newNumberOfRatings = newNumberOfRatings + 1;
        newSumOfRatings = newSumOfRatings + rating;

        var newRating = Math.round(newSumOfRatings / newNumberOfRatings * 10) / 10; // https://stackoverflow.com/questions/661562/how-to-format-a-float-in-javascript

        // Update firebase data with new ratings for the movie
        firebase.database().ref('movies/' + movieID).set({
            sumOfRatings: newSumOfRatings,
            rating: newRating,
            numberOfRatings: newNumberOfRatings
        });

    }

    static toggleFav(refToMoviePage, poster, title, overview, imdb_id, id) {
        
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // Checking if movie exist or not
                var firebaseref = firebase.database().ref(`users/${user.uid}`);
                this.checkIfMovieExist(user.uid, imdb_id, 'favoriteList').then((exist) => {
                    // if it does exist, then we are removing
                    if (exist) {
                        refToMoviePage.setState({ movieInFavorites: false });
                        return firebase.database().ref('users/' + user.uid + '/favoriteList/').child(imdb_id).remove();
                    } else {
                        // if it doesn't exist, we add it to the database
                        firebaseref.child('favoriteList').child(imdb_id)
                            .set({ poster: poster, title: title, overview: overview, imdb_id: imdb_id, id: id });
                        refToMoviePage.setState({ movieInFavorites: true });
                    }
                });

            } else {
                refToMoviePage.signInNotification();
            }
        });
    }

    /**
 * This method check if the movie exist in a list
 */
    static checkIfMovieExist = async (user_id, movie_id, type) => {
        var firebaseref = firebase.database().ref(`users/${user_id}`);
        return firebaseref.child(type).child(movie_id).once('value')
            .then(snapshot => snapshot.exists());
    }
}

export default MovieFirebaseService;