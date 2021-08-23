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
            subcollections: [
                {
                    collection: 'categories',
                    doc: categoryId
                },
                {
                    collection: 'groups',
                    doc: activeGroup.id
                },
                {
                    collection: 'items'
                }
            ],
            storeAs: 'products'
        }
    }
    useFirestoreConnect([
        { ...firestoreObj }
    ])
    return useSelector(state => state.firestore.ordered.products || [])
};

export default useProducts;
