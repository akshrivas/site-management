import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import useUid from 'src/utils/useUid';

const useCategories = () => {
  const uid = useUid();
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
