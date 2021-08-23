import db from 'src/utils/db';

export default async (request, response) => {
  const { data } = request.body;
  if(data){
    try {
      let { userId, categoryId, groupId, product } = data;
      const productsDoc = await db.collection(`users/${userId}/categories/${categoryId}/groups/${groupId}/items`).get();
      const products = productsDoc.docs.map(product => ({
        id: product.id,
        ...product.data()
      }));
      if(products.some((item) => item.name == product.name)){
        res.status(400).end();
      }
      else{
        const { id } = await db.collection(`users/${userId}/categories/${categoryId}/groups/${groupId}/items`).add({
          ...product,
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