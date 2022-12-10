import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import useUid from 'src/utils/useUid';

const useBeds = () => {
    const uid = useUid();
    console.log(uid);
    let firestoreObj = {
        collection: 'users',
        doc: uid,
        subcollections: [{ 
          collection: 'beds'
       }],
       storeAs: `beds`
    }
    useFirestoreConnect([
        { ...firestoreObj }
    ])
    return useSelector(state => state.firestore.ordered['beds'] || [])
};

export default useBeds;
