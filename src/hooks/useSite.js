import { get } from "lodash";
import { useSelector } from "react-redux";
const defaultSite = "sxaWSMh0G9OaN9fYS4YG";

const useSite = () => {
  return useSelector(
    (state) => get(state, "firebase.profile.sites[0]") || defaultSite
  );
};

export default useSite;
