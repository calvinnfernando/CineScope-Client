import firebase from 'firebase';

/**
 * The purpose of this class is to access movie data stored inside of Firebase. Functions add to and remove data from Firebase
 */
class MovieFirebaseService {

    /**
     * This method returns the user logged in
     * @param refToPage ref to the movie page so its state can be set
     */
    static getCurrentUser = async (refToPage) => {

        firebase.auth().onAuthStateChanged(user => {
            console.log('in here');
            if (user) {
                refToPage.setState({ currentUser: user.uid })
            } else {
            }
        });
    }

    /** 
     * This method returns the rating for a movie
     * @param movieID the ID of the movie to get a rating for
     * @param refToPage ref to the movie page so that its state can be set
     */
    static getRating(refToPage, movieID) {
        var ratingRef = firebase.database().ref('movies/' + movieID);
        ratingRef.on('value', function (snapshot) {
            var firebaseRating = snapshot.val();
            if (firebaseRating) {
                refToPage.setState({ vote_average: firebaseRating.rating });
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
     * @param refToPage reference to movie page to be updated
     * @param movieID id of movie to get reviews for
     */
    static getReviews(refToPage, movieID) {
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
            var newReviews = refToPage.state.reviews.concat(tempReviews)
            refToPage.setState({ reviews: newReviews })
        })
    }

    static uploadReview(refToPage, reviewText) {
        var displayName = ""
        firebase.database().ref('/users/' + refToPage.state.currentUser).once('value').then((snapshot) => {
            displayName = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
            firebase.database().ref('movies/' + refToPage.state.movie_id).child('reviews/' + displayName).set({
                review: reviewText
            });
            refToPage.setState({ displayName: displayName })
            refToPage.setState({ reviewSubmitted: true });
            refToPage.setState({ emptyReview: false });

        });
    }

    /**
     * Adds or removes movie from firebase and performs other actions related to the page 
     * @param {*} refToPage reference to React component to update
     * @param {string} list 'favoritesList', 'watchedList', or 'watchLaterList', the list to add or remove from
     * @param {string} source 'moviePage' or 'userPage', the page we are calling from
     * @param {*} movieID id of the movie to add or remove (the TMDb one, not IMDb)
     * @param {*} otherArgs other args passed in depending on where function is being called from. If it's 'moviePage', 
     * we must pass in poster, title, overview, imdb_id in that order. If it's userPage, pass in i, the index in the
     * list
     */
    static toggleWatchList(refToPage, list, source, movieID, ...otherArgs) {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // Checking if movie exists or not
                var firebaseref = firebase.database().ref(`users/${user.uid}`);
                this.checkIfMovieExist(user.uid, list, movieID).then((exist) => {
                    // if it does exist, then we are removing
                    if (exist) {
                        firebase.database().ref('users/' + user.uid + `/${list}/`).child(movieID).remove();

                        // Update pages based on what page we are calling this method from 
                        switch (source) {
                            case 'moviePage':
                                this.updateWatchListExistence(refToPage, movieID);
                                break;
                            case 'userPage':
                                const i = otherArgs;
                                this.updateUserWatchListExistence(refToPage, list, i);
                                break;
                        }

                    } else {
                        // if it doesn't exist, we add it to the database
                        const [poster, title, overview, imdb_id] = otherArgs;
                        firebaseref.child(list).child(movieID)
                            .set({ poster: poster, title: title, overview: overview, imdb_id: imdb_id, id: movieID });

                        // Update pages based on what page we are calling this method from 
                        switch (source) {
                            case 'moviePage':
                                this.updateWatchListExistence(refToPage, movieID);
                                break;
                            case 'userPage':
                                // will never call from this
                                break;
                        }

                    }
                });

            } else {
                refToPage.signInNotification();
            }
        });
    }

    /**
     * Sets state based on whether the movies exist
     */
    static updateWatchListExistence(refToPage, movieID) {
        const lists = ['favoritesList', 'watchedList', 'watchLaterList'];
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                for (const list of lists) {
                    this.checkIfMovieExist(user.uid, list, movieID).then((exist) => {
                        if (exist) {
                            switch (list) {
                                case 'favoritesList':
                                    refToPage.setState({ movieInFavorites: true });
                                    break;
                                case 'watchedList':
                                    refToPage.setState({ movieInWatched: true });
                                    break;
                                case 'watchLaterList':
                                    refToPage.setState({ movieInWatchLater: true });
                                    break;
                            }
                        } else {
                            switch (list) {
                                case 'favoritesList':
                                    refToPage.setState({ movieInFavorites: false });
                                    break;
                                case 'watchedList':
                                    refToPage.setState({ movieInWatched: false });
                                    break;
                                case 'watchLaterList':
                                    refToPage.setState({ movieInWatchLater: false });
                                    break;
                            }
                        }
                    });
                }
            }
        });
    }

    /**
     * Sets state based on whether the movies exist
     */
    static updateUserWatchListExistence(refToPage, list, i) {
        switch (list) {
            case 'favoritesList':
                refToPage.state.favoritesList.splice(i, 1);
                let newFavList = refToPage.state.favoritesList;
                refToPage.setState({ favoritesList: newFavList });
                break;
            case 'watchedList':
                refToPage.state.watchedList.splice(i, 1);
                let newWatchedList = refToPage.state.watchedList;
                refToPage.setState({ watchedList: newWatchedList });
                break;
            case 'watchLaterList':
                refToPage.state.laterList.splice(i, 1);
                let newLaterList = refToPage.state.laterList;
                refToPage.setState({ laterList: newLaterList });
                break;
        }

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