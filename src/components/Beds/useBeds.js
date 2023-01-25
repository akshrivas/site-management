import { useSelector } from "react-redux";
import { isLoaded, useFirestoreConnect } from "react-redux-firebase";
import useSite from "src/hooks/useSite";
import { get, groupBy } from "lodash";
import moment from "moment";

const useBeds = (id) => {
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
  const selectedBed = useSelector((state) =>
    get(state, `firestore.data.beds.${id}`)
  );

  const updatedBeds = beds?.map((bed) => {
    const activeDate = moment(bed.wormsAddedOn);
    const today = moment();
    const age = today.diff(activeDate, "days");
    const area = Number(bed.bedWidth) * Number(bed.bedLength);
    const size = `${bed.bedWidth} * ${bed.bedLength}`;
    const packets = Math.floor(area / 8);
    const production = packets * 40;
    // console.log(bed.bedNumber, packets, production);
    return {
      ...bed,
      age,
      size,
      packets,
      area,
      production,
    };
  });

  const grouped = groupBy(updatedBeds, (item) => item.status);
  const tabs = Object.keys(grouped).map((item) => {
    return {
      key: item,
      title: item,
      data: grouped[item],
    };
  });

  // console.log(tabs);
  const tabsWithAll = [
    {
      key: "All",
      title: "All",
      data: updatedBeds,
    },
    ...tabs,
  ];

  const initial = {
    totalPacketsPerCycle: 0,
    totalProductiveArea: 0,
    totalProduction: 0,
  };

  const data = updatedBeds?.reduce((acc, current) => {
    acc.totalPacketsPerCycle += current.packets;
    acc.totalProductiveArea += current.area;
    acc.totalProduction += current.production;

    return acc;
  }, initial);

  // console.log(data);
  const statistics = {
    ...data,
    totalPacketsYearly: data?.totalPacketsPerCycle * 4,
    totalSale: data?.totalPacketsPerCycle * 4 * 330,
    totalBeds: updatedBeds?.length,
    totalProductionYearlyInTonn: Math.floor((data?.totalProduction * 4) / 1000),
  };

  return {
    beds: updatedBeds,
    tabs: tabsWithAll,
    isLoading: !isLoaded(beds),
    statistics,
    selectedBed,
  };
};

export default useBeds;
