import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import useUid from 'src/utils/useUid';

const useOffers = () => {
    const uid = useUid();
    let firestoreObj = {
        collection: 'users',
        doc: uid,
        subcollections: [{ 
          collection: 'offers'
       }],
        storeAs: `offers`
    }
    useFirestoreConnect([
        { ...firestoreObj }
    ])
    return useSelector(state => state.firestore.ordered['offers'] || [])
};

export default useOffers;
