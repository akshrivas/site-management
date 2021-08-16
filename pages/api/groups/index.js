import db from 'src/utils/db';

export default async (request, response) => {
  const { category, userId } = request.query;
  try {
    const groupsDoc = await db.collection(`users/${userId}/categories/${category}/groups`).get();
    const groups = groupsDoc.docs.map(group => ({
      id: group.id,
      ...group.data()
    }));
    response.status(200).json({ groups });
  } catch (e) {
    response.status(400).end();
  }
}