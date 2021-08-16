import db from 'src/utils/db';

export default async (request, response) => {
  const { userId } = request.query;
  try {
    const categoriesDoc = await db.collection(`users/${userId}/categories`).get();
    const categories = categoriesDoc.docs.map(category => ({
      id: category.id,
      ...category.data()
    }));
    response.status(200).json({ categories });
  } catch (e) {
    response.status(400).end();
  }
}