import { useSelector } from 'react-redux';

const useUid = () => {
    const uid = useSelector((state) => state.firebase.auth.uid);
    return uid;
  };
  
  export default useUid;