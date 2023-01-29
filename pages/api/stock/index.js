import moment from "moment";
import db from "src/utils/db";

const addStock = async (request, response) => {
  const { data, userId, site } = request.body;
  const createDate = moment().toISOString();

  const updatedData = {
    ...data,
    createDate,
    user: userId,
  };

  if (updatedData) {
    try {
      const result = await db
        .collection(`sites/${site}/stock`)
        .add(updatedData);
      response.status(200).json({ id: result.id, message: "success" });
    } catch (e) {
      response.status(400).end();
    }
  } else response.status(400).end();
};

export default addStock;
