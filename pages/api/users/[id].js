import db from "src/utils/db";

const updateProfile = async (req, res) => {
  const { id } = req.query;
  const { ...rest } = req.body;
  console.log(id);
  console.log(rest);
  try {
    await db
      .collection("users")
      .doc(id)
      .set({
        ...rest,
        updated: new Date().toISOString(),
      });
    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

export default updateProfile;
