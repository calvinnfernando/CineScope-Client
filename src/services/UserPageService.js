import firebase from 'firebase';
import MovieFirebaseService from './MovieFirebaseService';

class UserPageService {
    static getCurrentUser (refToPage) {
        MovieFirebaseService.getCurrentUser(refToPage);
    }

    static setUserWatchLists(refToPage) {
        const lists = ['favoritesList', 'watchedList', 'watchLaterList'];
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                for (const list of lists) {
                    const ref = firebase.database().ref().child('users/' + user.uid + `/${list}`).orderByKey();
                    ref.once('value').then((snapshot) => {
                        snapshot.forEach(child => {
                            if (child.val()) {
                                switch (list) {
                                    case 'favoritesList':
                                        refToPage.setState({
                                            favoritesList: refToPage.state.favoritesList.concat([child.val()]),
                                        });
                                        break;
                                    case 'watchedList':
                                        refToPage.setState({
                                            watchedList: refToPage.state.watchedList.concat([child.val()]),
                                        });
                                        break;
                                    case 'watchLaterList':
                                        refToPage.setState({
                                            laterList: refToPage.state.laterList.concat([child.val()]),
                                        });
                                        break;
                                }
                            }
                        });
                    });
                }
            }
        });
    }

    static deleteWatchList(list, movieID, i) {
        MovieFirebaseService.toggleWatchList(this, list, 'userPage', movieID, i);
    }
}

export default UserPageService;