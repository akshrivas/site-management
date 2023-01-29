import { get } from "lodash";
import { useSelector } from "react-redux";
const defaultSite = "no-site";

const useSite = () => {
  return useSelector(
    (state) => get(state, "firebase.profile.sites[0]") || defaultSite
  );
};

export default useSite;
