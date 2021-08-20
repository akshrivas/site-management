import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import useUid from 'src/utils/useUid';

const useGroups = (activeCategory) => {
  const uid = useUid();
  let firestoreObj = {
    collection: 'users'
  }
  if(activeCategory){
    firestoreObj = {
      collection: 'users',
      doc: uid,
      subcollections: [
        {
          collection: 'categories',
          doc: activeCategory ? activeCategory.id : '',
        },
        {
          collection: 'groups'
        }
      ],
      storeAs: 'groups'
    }
  }
  useFirestoreConnect([
    {...firestoreObj}
  ])
  return useSelector(state => state.firestore.ordered.groups || [])
};

export default useGroups;
