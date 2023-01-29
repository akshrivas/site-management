import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
import "firebase/storage";
import { firebaseConfig } from "../config";

export const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      // The default selected country.
      defaultCountry: "IN",
    },
  ],
  callbacks: {
    signInSuccess: () => true,
  },
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.firestore().enablePersistence();
// .catch((err) => {
//   if (err.code === "failed-precondition") {
//     // Multiple tabs open, persistence can only be enabled
//     // in one tab at a a time.
//     // ...
//   } else if (err.code === "unimplemented") {
//     // The current browser does not support all of the
//     // features required to enable persistence
//     // ...
//   }
// });

export default firebase;
