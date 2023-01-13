import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import useSite from "src/hooks/useSite";
import { getUrgentBedActivities } from "src/utils/betActivities";

const useActivities = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const {
    query: { activityDate = moment().format("YYYY-MM-DD") },
  } = router;
  const site = useSite();
  let firestoreObj = {
    collection: "sites",
    doc: site,
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
      // console.log(current);
      const data = getUrgentBedActivities(current);
      if (!data) return acc;
      const due = moment(data.dueDate);
      const activity = moment(activityDate);
      const isDue = activity >= due;
      if (isDue) {
        acc.push({
          ...data,
          delay: moment().diff(due, "days"),
        });
      }
      return acc;
    }, []);

    setData(withActions?.sort((a, b) => moment(a.dueDate) - moment(b.dueDate)));
  }, [activityDate, actions]);

  return {
    data,
    isLoading: !isLoaded(actions),
  };
};

export default useActivities;
