import moment from "moment";
import db from "src/utils/db";

const editBed = async (req, res) => {
  const { id: bed } = req.query;
  const { data, site, userId } = req.body;
  try {
    if (req.method === "PUT") {
      await db
        .collection(`sites/${site}/beds`)
        .doc(bed)
        .update({
          ...data,
          updated: moment().toISOString(),
          updatedBy: userId,
        });
    } else if (req.method === "DELETE") {
      await db.collection(`sites/${site}/beds`).doc(bed).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};

export default editBed;
