import { firebaseConfig } from '../config'
import Firebase from 'firebase';
import 'firebase/auth';

const FirebaseCredentials = {
    ...firebaseConfig
}
// if a Firebase instance doesn't exist, create one
if (!Firebase.apps.length) {
  Firebase.initializeApp(FirebaseCredentials)
}

export default Firebase;