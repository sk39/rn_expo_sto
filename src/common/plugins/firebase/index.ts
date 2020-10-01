import * as firebase from 'firebase';
//import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";
import Firestore from "./Firestore";
import Analytics from "./Analytics";

try {
    const config = require("@/google-services-web.json");
    if (config.firebase && config.firebase.apiKey) {
        firebase.initializeApp(config.firebase);
        Firestore.enable = true;
        Analytics.enable = true;
    } else {
        console.log("No firebase config")
    }
} catch (e) {
    console.log("No firebase config")
}

