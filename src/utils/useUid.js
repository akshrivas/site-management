import { useSelector } from 'react-redux';

const useUid = () => {
    const uid = useSelector((state) => state.firebase.auth.uid) || '48X6bGqxqTVIDIoxD1l4006s8pr2';
    return uid;
  };
  
  export default useUid;