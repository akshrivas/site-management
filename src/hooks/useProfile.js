import { get } from "lodash";
import { useSelector } from "react-redux";

const useProfile = () => {
  const { isEmpty, isLoaded, ...rest } = useSelector((state) =>
    get(state, "firebase.profile")
  );
  if (isLoaded && isEmpty) {
    return null;
  }
  return rest;
};

export default useProfile;
