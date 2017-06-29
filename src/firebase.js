import firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: 'AIzaSyAe_Fg0Lhxad6QGjobMnAPEqDrpRKI08eg',
    authDomain: 'lunch-rush-7bb63.firebaseapp.com',
    databaseURL: 'https://lunch-rush-7bb63.firebaseio.com',
    projectId: 'lunch-rush-7bb63',
    storageBucket: 'lunch-rush-7bb63.appspot.com',
    messagingSenderId: '162464511043'
  };

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
