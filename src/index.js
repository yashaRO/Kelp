import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase'
var app = firebase.initializeApp({
  apiKey: "AIzaSyAE2qy3ibl3nlZgu42VOwu4kUhnnJ9gdSQ",
  authDomain: "kelp-1515047264582.firebaseapp.com",
  databaseURL: "https://kelp-1515047264582.firebaseio.com",
  projectId: "kelp-1515047264582",
  storageBucket: "kelp-1515047264582.appspot.com",
  messagingSenderId: "840221146546"
})

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
