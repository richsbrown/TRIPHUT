import firebase from 'firebase/compat/app'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBP0OXAf4rRHPkF308C_A_xrlNU0F2lOwc",
  authDomain: "triphut-2f9b0.firebaseapp.com",
  projectId: "triphut-2f9b0",
  storageBucket: "triphut-2f9b0.appspot.com",
  messagingSenderId: "111858971557",
  appId: "1:111858971557:web:00e3daf6b7c8acf5dc2e4c"
};

firebase.initializeApp(firebaseConfig)

const storage = getStorage()


export {storage, firebase as default }
