import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { getUrgentBedActivities } from "src/utils/betActivities";
import { DATE_FORMAT } from "src/utils/constants";

const useActivities = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const {
    query: { activityDate = moment().format("YYYY-MM-DD") },
  } = router;
  let firestoreObj = {
    collection: "sites",
    doc: "6ukzrsNDUOR5XoltUTVf",
    subcollections: [
      {
        collection: "beds",
        orderBy: ["wormsAddedOn", "desc"],
      },
    ],
    storeAs: `beds`,
  };
  useFirestoreConnect([{ ...firestoreObj }]);

  const actions = useSelector((state) => state.firestore.ordered["beds"]);
  useEffect(() => {
    const withActions = actions?.reduce((acc, current) => {
      const data = getUrgentBedActivities(current);
      if (!data) return acc;
      const due = moment(data.dueDate, DATE_FORMAT).valueOf();
      const activity = moment(activityDate, "YYYY-MM-DD").valueOf();
      // console.log(due < activity);
      const isDue = activity >= due;
      if (isDue) acc.push(data);
      return acc;
    }, []);

    setData(
      withActions?.sort(
        (a, b) =>
          moment(a.dueDate, DATE_FORMAT).valueOf() -
          moment(b.dueDate, DATE_FORMAT).valueOf()
      )
    );
  }, [activityDate, actions]);
  return data;
};

export default useActivities;
