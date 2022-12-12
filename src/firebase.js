import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://projet-mobile.firebaseio.com",
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "projet-mobile.appspot.com",
    appId: process.env.REACT_APP_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);