import db from 'src/utils/db';

export default async (request, response) => {
  const { data } = request.body;
  if(data){
    try {
      let { userId, categoryId, groupId, product } = data;
      // const productsDoc = await db.collection(`products`).get();
      // const products = productsDoc.docs.map(product => ({
      //   id: product.id,
      //   ...product.data()
      // }));
      // if(products.some((item) => item.name == product.name)){
      //   console.log('product already existings')
      // }
      // else{
        const { id } = await db.collection(`products`).add({
          ...product,
          groupId,
          categoryId,
          userId,
          created: new Date().toISOString(),
        });
        response.status(200).json({ id, message: 'success' });
      // }
    } catch (e) {
      response.status(400).end();
    }
  }
  else response.status(400).end();
}