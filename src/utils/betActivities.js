import { groupBy } from "lodash";
import moment from "moment";
import { FINAL_HARVEST, FIRST_HARVEST, SECOND_HARVEST } from "./constants";
import activityHoursMap from "src/json/activityHourMap.json";
import profileData from "src/json/profileData.json";

const addDays = (d, days) => moment(d).add(days + 1, "days");

const getBedActivities = (bed) => {
  const { fillDate, bedNumber, id } = bed;
  const common = {
    bedNumber,
    id,
  };

  return [
    {
      action: "ACTIVATE",
      dueDate: addDays(fillDate, 2),
      status: "PENDING",
      completedOn: null,
      ...common,
    },
    {
      action: "CHECK_BED",
      dueDate: addDays(fillDate, 5),
      status: "PENDING",
      completedOn: null,
      ...common,
    },
    {
      action: "RAKE",
      dueDate: addDays(fillDate, 17),
      status: "PENDING",
      completedOn: null,
      ...common,
    },
    {
      action: "HARVEST1",
      dueDate: addDays(fillDate, 30),
      status: "PENDING",
      completedOn: null,
      ...common,
    },
    {
      action: "HARVEST2",
      dueDate: addDays(fillDate, 45),
      status: "PENDING",
      completedOn: null,
    },
    {
      action: "HARVEST3",
      dueDate: addDays(fillDate, 60),
      status: "PENDING",
      completedOn: null,
      ...common,
    },
    {
      action: "EMPTY",
      dueDate: addDays(fillDate, 62),
      status: "PENDING",
      completedOn: null,
      ...common,
    },
    {
      action: "FILL",
      dueDate: addDays(fillDate, 64),
      status: "PENDING",
      completedOn: null,
      ...common,
    },
  ];
};

export const getUrgentBedActivities = (bed) => {
  const {
    fillDate,
    status,
    bedNumber,
    id,
    createDate,
    firstHarvestDate,
    secondHarvestDate,
    finalHarvestDate,
    rakeDate,
  } = bed;
  const d = moment(fillDate);
  const today = moment();
  const age = today.diff(d, "days");
  const common = {
    bedNumber,
    id,
    age,
  };

  // console.log(common, fillDate);
  if (age >= 60 && status === "Active" && !finalHarvestDate) {
    return {
      action: FINAL_HARVEST,
      dueDate: addDays(fillDate, 60),
      status: "PENDING",
      completedOn: null,
      age,
      ...common,
    };
  }
  if (
    age >= 45 &&
    status === "Active" &&
    !finalHarvestDate &&
    !secondHarvestDate
  ) {
    return {
      action: SECOND_HARVEST,
      dueDate: addDays(fillDate, 45),
      status: "PENDING",
      completedOn: null,
      age,
      ...common,
    };
  }
  if (
    age >= 30 &&
    status === "Active" &&
    !finalHarvestDate &&
    !secondHarvestDate &&
    !firstHarvestDate
  ) {
    return {
      action: FIRST_HARVEST,
      dueDate: addDays(fillDate, 30),
      status: "PENDING",
      completedOn: null,
      age,
      ...common,
    };
  }
  if (
    age >= 15 &&
    status === "Active" &&
    !finalHarvestDate &&
    !secondHarvestDate &&
    !firstHarvestDate &&
    !rakeDate
  ) {
    return {
      action: "RAKE",
      dueDate: addDays(fillDate, 17),
      status: "PENDING",
      completedOn: null,
      age,
      ...common,
    };
  }

  if (status === "Empty") {
    return {
      action: "ACTIVATE",
      dueDate: addDays(createDate, 2),
      status: "PENDING",
      completedOn: null,
      ...common,
    };
  }
  if (status === "Filled") {
    return {
      action: "ACTIVATE",
      dueDate: addDays(fillDate, 2),
      status: "PENDING",
      completedOn: null,
      ...common,
    };
  }
  //   if (status === "Active" && !bedCheckedOn) {
  //     return {
  //       action: "ACTIVATE",
  //       dueDate: addDays(fillDate, 5),
  //       status: "PENDING",
  //       completedOn: null,
  //       age,
  //       ...common,
  //     };
  //   }
};

export default getBedActivities;

export const transformActivityTabs = (activities = []) => {
  if (activities.length === 0) return [];
  const grouped = groupBy(activities, (item) => item.action);
  let totalCost = 0;
  let totalLabour = 0;
  const tabs = Object.keys(grouped).map((item) => {
    const labour = Math.ceil(
      (grouped[item].length * activityHoursMap[item]) / 8
    );
    const cost = labour * profileData.labourCostPerDay;
    totalCost += cost;
    totalLabour += labour;
    return {
      key: item,
      title: item,
      data: grouped[item],
      labour: Math.ceil((grouped[item].length * activityHoursMap[item]) / 8),
      cost,
    };
  });

  return [
    {
      key: "All",
      title: "All",
      data: activities,
      labour: totalLabour,
      cost: totalCost,
    },
    ...tabs,
  ];
};
