import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBKpz7KeWApH7aNgm2zb2wmK-sp9tfHpSs",
    authDomain: "react-sms-verification.firebaseapp.com",
    databaseURL: "https://react-sms-verification.firebaseio.com",
    projectId: "react-sms-verification",
    storageBucket: "react-sms-verification.appspot.com",
    messagingSenderId: "1092451166131",
    appId: "1:1092451166131:web:5b80e60630700036888dc6",
    measurementId: "G-8LX9QBK770"
  };

firebase.initializeApp(config);
export default firebase;