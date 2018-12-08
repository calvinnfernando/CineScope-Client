import firebase from 'firebase';
import FirebaseService from './FirebaseService';

class UserPageService {
    static getCurrentUser (refToPage) {
        FirebaseService.getCurrentUser(refToPage);
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

    static deleteWatchList(refToPage, list, movieID, i) {
        FirebaseService.toggleWatchList(refToPage, list, 'userPage', movieID);
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
}

export default UserPageService;