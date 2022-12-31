import moment from "moment";
import {
  DATE_FORMAT,
  FINAL_HARVEST,
  FIRST_HARVEST,
  SECOND_HARVEST,
} from "./constants";

const addDays = (d, days) =>
  moment(d)
    .add(days + 1, "days")
    .format(DATE_FORMAT);

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
  const d = moment(fillDate, "YYYY-MM-DD");
  const today = moment();
  const age = today.diff(d, "days");
  const common = {
    bedNumber,
    id,
    age,
  };
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
  if (age >= 45 && status === "Active" && !secondHarvestDate) {
    return {
      action: SECOND_HARVEST,
      dueDate: addDays(fillDate, 45),
      status: "PENDING",
      completedOn: null,
      age,
      ...common,
    };
  }
  if (age >= 30 && status === "Active" && !firstHarvestDate) {
    return {
      action: FIRST_HARVEST,
      dueDate: addDays(fillDate, 30),
      status: "PENDING",
      completedOn: null,
      age,
      ...common,
    };
  }
  if (age >= 15 && status === "Active" && !rakeDate) {
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

// { dueDate: moment(fillDate).add(2, "days"), status: "PENDING" },
//       {
//         dueDate: moment(fillDate).add(5, "days"),
//         status: "PENDING",
//         checkWorms: true,
//       },
//     ],
//     rake: [{ dueDate: moment(fillDate).add(17, "days"), status: "PENDING" }],
//     harvest: [
//       { dueDate: moment(fillDate).add(30, "days"), status: "PENDING" },
//       { dueDate: moment(fillDate).add(45, "days"), status: "PENDING" },
//       { dueDate: moment(fillDate).add(60, "days"), status: "PENDING" },
//     ],

//   });
