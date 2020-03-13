import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAPFENVO1KNlXju8HDzCRX3y9ouWN07XRo',
	authDomain: 'revents-268704.firebaseapp.com',
	databaseURL: 'https://revents-268704.firebaseio.com',
	projectId: 'revents-268704',
	storageBucket: 'revents-268704.appspot.com',
	messagingSenderId: '1040105790391',
	appId: '1:1040105790391:web:b44b2164a247cd4768e632'
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
