import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

const useCategories = () => {
  const uid = useSelector((state) => state.firebase.auth.uid);
  useFirestoreConnect([
    {
      collection: 'users',
      doc: uid,
      subcollections: [{ 
        collection: 'categories'
     }],
      storeAs: `categories`
    }
  ]);
  return useSelector(state => state.firestore.ordered.categories || [])
};

export default useCategories;
