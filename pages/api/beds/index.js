import moment from "moment";
import db from "src/utils/db";

const addBed = async (request, response) => {
  const { data } = request.body;
  const createDate = moment().format("YYYY-MM-DD");
  if (data.status === "Filled") {
    delete data.wormsAddedOn;
  }

  const updatedData = {
    ...data,
    createDate,
    requiredWorms: data.requiredWorms || (data.bedLength * data.bedWidth) / 4,
  };
  console.log("Test ==>", updatedData);
  if (updatedData) {
    try {
      const result = await db
        .collection(`sites/6ukzrsNDUOR5XoltUTVf/beds`)
        .add(updatedData);
      response.status(200).json({ id: result.id, message: "success" });
    } catch (e) {
      response.status(400).end();
    }
  } else response.status(400).end();
};

export default addBed;
