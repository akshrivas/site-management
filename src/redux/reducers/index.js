import { combineReducers } from 'redux';
import storeReducers from './storeReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
const rootReducer = combineReducers({
storeItems: storeReducers,
firestore: firestoreReducer,
firebase: firebaseReducer
});
export default rootReducer;