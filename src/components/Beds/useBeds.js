import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

const useBeds = () => {
  let firestoreObj = {
    collection: "sites",
    doc: "6ukzrsNDUOR5XoltUTVf",
    subcollections: [
      {
        collection: "beds",
        orderBy: ["bedNumber", "asc"],
      },
    ],
    storeAs: `beds`,
  };
  useFirestoreConnect([{ ...firestoreObj }]);
  return useSelector((state) => state.firestore.ordered["beds"] || []);
};

export default useBeds;
