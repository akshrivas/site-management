import db from "src/utils/db";

const editBed = async (req, res) => {
  const { id } = req.query;
  const { userId, ...rest } = req.body;
  console.log(userId);
  delete rest.id;
  try {
    if (req.method === "PUT") {
      await db
        .collection(`sites/6ukzrsNDUOR5XoltUTVf/beds`)
        .doc(id)
        .update({
          ...rest,
          updated: new Date().toISOString(),
        });
    } else if (req.method === "DELETE") {
      await db.collection(`sites/6ukzrsNDUOR5XoltUTVf/beds`).doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};

export default editBed;
