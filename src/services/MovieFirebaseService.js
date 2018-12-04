import firebase from 'firebase';

class MovieFirebaseService {

    
    /*static getCurrentUser = async () => {
        

        var userID = await firebase.auth().onAuthStateChanged(user => {
            console.log('in here');
            if (user) {
                
                userID = user.uid;
                console.log(userID);
                return userID;
            } else {
            }
        });

        console.log('out here')
        console.log(userID)

        return userID;
        //console.log(props.firebase.auth.app.firebase_.database().ref('users'));
    }*/

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
        /*
        firebase.database().ref('movies/' + movieID).on('value', function (snapshot) {
            console.log(snapshot.val());
        });*/
    }

}

export default MovieFirebaseService;