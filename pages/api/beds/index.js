import moment from "moment";
import db from "src/utils/db";

const addBed = async (request, response) => {
  const { data, userId, site } = request.body;
  const createDate = moment().toISOString();
  if (data.status === "Filled") {
    delete data.wormsAddedOn;
    data.fillDate = moment().toISOString();
  }
  if (data.status === "Active") {
    data.wormsAddedOn = moment(data.wormsAddedOn).toISOString();
    data.fillDate = moment(data.wormsAddedOn).subtract(2, "days").toISOString();
  }

  const updatedData = {
    ...data,
    createDate,
    requiredWorms: data.requiredWorms || (data.bedLength * data.bedWidth) / 4,
    user: userId,
  };

  if (updatedData) {
    try {
      const result = await db.collection(`sites/${site}/beds`).add(updatedData);
      response.status(200).json({ id: result.id, message: "success" });
    } catch (e) {
      response.status(400).end();
    }
  } else response.status(400).end();
};

export default addBed;
