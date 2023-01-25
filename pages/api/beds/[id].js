import moment from "moment";
import db from "src/utils/db";

const editBed = async (req, res) => {
  const { id: bed } = req.query;
  const { data, site, userId, action } = req.body;
  try {
    if (req.method === "PUT") {
      if (!action) {
        await db
          .collection(`sites/${site}/beds`)
          .doc(bed)
          .update({
            ...data,
            updated: moment().toISOString(),
            updatedBy: userId,
          });
      } else {
        await db
          .collection(`sites/${site}/beds`)
          .doc(bed)
          .update({
            ...data,
            fillDate: "",
            status: "Empty",
            wormsAddedOn: "",
            updated: moment().toISOString(),
            updatedBy: userId,
          });
        await db.collection(`sites/${site}/history`).add({
          ...data,
          bedId: bed,
          status: "Completed",
          completedOn: moment().toISOString(),
          completedBy: userId,
        });
      }
    } else if (req.method === "DELETE") {
      await db.collection(`sites/${site}/beds`).doc(bed).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};

export default editBed;
