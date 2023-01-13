import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import useSite from "src/hooks/useSite";
import { get } from "lodash";

const useBeds = () => {
  const site = useSite();

  let firestoreObj = {
    collection: "sites",
    doc: site,
    subcollections: [
      {
        collection: "beds",
        orderBy: ["bedNumber", "asc"],
      },
    ],
    storeAs: `beds`,
  };
  useFirestoreConnect([{ ...firestoreObj }]);
  const beds = useSelector((state) => get(state, "firestore.ordered.beds"));
  return {
    beds: beds,
    isLoading: !isLoaded(beds),
  };
};

export default useBeds;
