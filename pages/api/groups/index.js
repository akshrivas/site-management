import db from 'src/utils/db';

export default async (request, response) => {
  const { data } = request.body;
  if(data){
    try {
      let { userId, categoryId, group } = data;
      const groupsDoc = await db.collection(`users/${userId}/categories/${categoryId}/groups`).get();
      const groups = groupsDoc.docs.map(group => ({
        id: group.id,
        ...group.data()
      }));
      if(groups.some((item) => item.name == group.name)){
        res.status(400).end();
      }
      else{
        const { id } = await db.collection(`users/${userId}/categories/${categoryId}/groups`).add({
          ...group,
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