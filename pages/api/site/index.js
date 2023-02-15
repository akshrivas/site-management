import db from "src/utils/db";

const addBed = async (request, response) => {
  const { data } = request.body;
  if (data) {
    try {
      const result = await db.collection(`sites`).add(data);
      response.status(200).json({ id: result.id, message: "success" });
    } catch (e) {
      response.status(400).end();
    }
  } else response.status(400).end();
};

export default addBed;
