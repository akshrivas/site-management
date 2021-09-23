import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import useUid from 'src/utils/useUid';

const useProducts = (activeGroup, categoryId) => {
    const uid = useUid();
    let firestoreObj = {
        collection: 'users'
    }
    if (activeGroup && categoryId) {
        firestoreObj = {
            collection: 'users',
            doc: uid,
            subcollections: [{ 
              collection: 'products',
              where: [
                ['groupId', '==', activeGroup.id]
             ],
           }],
            storeAs: `products-${activeGroup.id}`
        }
    }
    useFirestoreConnect([
        { ...firestoreObj }
    ])
    console.log(activeGroup)
    return useSelector(state => state.firestore.ordered[activeGroup ? `products-${activeGroup.id}` : 'products'] || [])
};

export default useProducts;
