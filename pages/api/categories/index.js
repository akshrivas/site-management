import db from 'src/utils/db';

export default async (request, response) => {
  const { data } = request.body;
  if(data){
    try {
      let { userId, category } = data;
      const categoriesDoc = await db.collection(`users/${userId}/categories`).get();
      const categories = categoriesDoc.docs.map(category => ({
        id: category.id,
        ...category.data()
      }));
      if(categories.some((item) => item.name == category.name)){
        res.status(400).end();
      }
      else{
        const { id } = await db.collection(`users/${userId}/categories`).add({
          ...category,
          created: new Date().toISOString(),
        });
        response.status(200).json({ id, message: 'success' });
      }
    } catch (e) {
      response.status(400).end();
    }
  }
  else response.status(400).end();
}