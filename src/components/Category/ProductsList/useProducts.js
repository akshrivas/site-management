import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

const useProducts = (activeGroup, categoryId) => {
    let firestoreObj = {
        collection: 'products',
        storeAs: 'products'
    }
    if (activeGroup && categoryId) {
        firestoreObj = {
            collection: 'products',
            where: [
                ['groupId', '==', activeGroup.id]
            ],
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
