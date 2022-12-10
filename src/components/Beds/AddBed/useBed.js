import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import useUid from 'src/utils/useUid';

const useProducts = () => {
    const uid = useUid();
    let firestoreObj = {
        collection: 'users',
        doc: uid,
        subcollections: [{ 
          collection: 'products'
       }],
        storeAs: `products`
    }
    useFirestoreConnect([
        { ...firestoreObj }
    ])
    return useSelector(state => state.firestore.ordered['products'] || [])
};

export default useProducts;
