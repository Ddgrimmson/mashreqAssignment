import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import '@react-native-firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDlJiMnsrW5NdJD0qHsm9UonTT5_1m7KSs',
  authDomain: 'mysignup-8a232.firebaseapp.com',
  databaseURL:
    'https://eur01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fmysignup-8a232-default-rtdb.firebaseio.com%2F&data=05%7C02%7Cdeepanshud%40mashreq.com%7C1268c4dfe06540f6370c08dc840248af%7Cfa2187fa88304fa28a74fb8c523dd6c1%7C0%7C0%7C638530393283627528%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C60000%7C%7C%7C&sdata=yeA4YgD6dKv6g0b6mXo31LDbzwskdc2aomUajv4BNLg%3D&reserved=0',

  projectId: 'mysignup-8a232',
  storageBucket: 'mysignup-8a232.appspot.com',
  messagingSenderId: '369471627313',
  appId: '1:369471627313:ios:896af20ae3ef7b70d33510',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth()
const firestore = firebase.firestore()
const messaging = firebase.messaging

export {firebase, auth, firestore, messaging}
