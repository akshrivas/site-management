import db from 'src/utils/db';

export default async (req, res) => {
  const { id } = req.query;
  try {
    if (req.method === 'PUT') {
      await db.collection('users').doc(id).update({
        ...req.body,
        updated: new Date().toISOString(),
      });
    } else if (req.method === 'GET') {
      const doc = await db.collection('users').doc(id).get();
      const categoriesDoc = await db.collection(`users/${id}/categories`).get();
      const categories = categoriesDoc.docs.map(category => ({
        id: category.id,
        ...category.data()
      }));
      if (!doc.exists) {
        res.status(404).end();
      } else {
        res.status(200).json({
          ...doc.data(),
          categories
        });
      }
    } else if (req.method === 'DELETE') {
      await db.collection('users').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}