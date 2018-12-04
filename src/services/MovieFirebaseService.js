import firebase from 'firebase';

class MovieFirebaseService {

    /**
     * This method returns the user logged in
     * @param refToMoviePage ref to the movie page so its state can be set
     */
    static getCurrentUser = async (refToMoviePage) => {

        firebase.auth().onAuthStateChanged(user => {
            console.log('in here');
            if (user) {
                refToMoviePage.setState({ currentUser: user.uid })
            } else {
            }
        });
    }

    /** 
     * This method returns the rating for a movie
     * @param movieID the ID of the movie to get a rating for
     * @param refToMoviePage ref to the movie page so that its state can be set
     */
    static getRating(refToMoviePage, movieID) {
        var ratingRef = firebase.database().ref('movies/' + movieID);
        ratingRef.on('value', function (snapshot) {
            var firebaseRating = snapshot.val();
            if (firebaseRating) {
                refToMoviePage.setState({ vote_average: firebaseRating.rating });
            }
        });
    }

    /**
     * This method updates the average rating of a movie in the database
     * @param movieID the ID of the movie whose rating we are updating
     * @param rating the rating to give to the movie
     */
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

    /**
     * This returns the firebase reviews
     * @param refToMoviePage reference to movie page to be updated
     * @param movieID id of movie to get reviews for
     */
    static getReviews(refToMoviePage, movieID) {
        firebase.database().ref().child('/movies/' + movieID + '/reviews').once('value').then((snapshot) => {
            var tempReviews = []
            snapshot.forEach((child) => {
                console.log(child.key)
                console.log(child.val())
                tempReviews.push({
                    author: child.key,
                    content: child.val().review
                })
                console.log(tempReviews)
            });
            var newReviews = refToMoviePage.state.reviews.concat(tempReviews)
            refToMoviePage.setState({ reviews: newReviews })
        })
    }

    static uploadReview(refToMoviePage, reviewText) {
        var displayName = ""
        firebase.database().ref('/users/' + refToMoviePage.state.currentUser).once('value').then((snapshot) => {
            displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
            firebase.database().ref('movies/' + refToMoviePage.state.movie_id).child('reviews/' + displayName).set({
                review: reviewText
            });
            refToMoviePage.setState({ displayName: displayName })
            refToMoviePage.setState({ reviewSubmitted: true });
            refToMoviePage.setState({ emptyReview: false });
            
        });
    }

    static toggleWatchList(refToMoviePage, list, poster, title, overview, imdb_id, movieID) {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // Checking if movie exists or not
                var firebaseref = firebase.database().ref(`users/${user.uid}`);
                this.checkIfMovieExist(user.uid, list, movieID).then((exist) => {
                    // if it does exist, then we are removing
                    if (exist) {
                        firebase.database().ref('users/' + user.uid + `/${list}/`).child(movieID).remove();
                        this.updateWatchListExistence(refToMoviePage, movieID);
                    } else {
                        // if it doesn't exist, we add it to the database
                        firebaseref.child(list).child(movieID)
                            .set({ poster: poster, title: title, overview: overview, imdb_id: imdb_id, id: movieID });
                        this.updateWatchListExistence(refToMoviePage, movieID);
                    }
                });

            } else {
                refToMoviePage.signInNotification();
            }
        });
    }

    /**
     * Sets state based on whether the movies exist
     */
    static updateWatchListExistence(refToMoviePage, movieID) {
        const lists = ['favoritesList', 'watchedList', 'watchLaterList'];
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                for (const list of lists) {
                    this.checkIfMovieExist(user.uid, list, movieID).then((exist) => {
                        if (exist) {
                            switch (list) {
                                case 'favoritesList':
                                    refToMoviePage.setState({ movieInFavorites: true });
                                    break;
                                case 'watchedList':
                                    refToMoviePage.setState({ movieInWatched: true });
                                    break;
                                case 'watchLaterList':
                                    refToMoviePage.setState({ movieInWatchLater: true });
                                    break;
                            }
                        } else {
                            switch (list) {
                                case 'favoritesList':
                                    refToMoviePage.setState({ movieInFavorites: false });
                                    break;
                                case 'watchedList':
                                    refToMoviePage.setState({ movieInWatched: false });
                                    break;
                                case 'watchLaterList':
                                    refToMoviePage.setState({ movieInWatchLater: false });
                                    break;
                            }
                        }
                    });
                }
            }
        });
    }

    /**
    * This method check if the movie exist in a list
    */
    static checkIfMovieExist = async (user_id, type, movie_id) => {
        var firebaseref = firebase.database().ref(`users/${user_id}`);
        return firebaseref.child(type).child(movie_id).once('value')
            .then(snapshot => snapshot.exists());
    }
}

export default MovieFirebaseService;