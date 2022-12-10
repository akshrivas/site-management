import db from 'src/utils/db';

const addBed = async (request, response) => {
  const { data } = request.body;
  if(data){
    try {
      let { userId, ...rest } = data;
      const { id } = await db.collection(`users/${userId}/beds`).add({
        ...rest,
        created: new Date().toISOString(),
      });
      response.status(200).json({ id, message: 'success' });
    } catch (e) {
      response.status(400).end();
    }
  }
  else response.status(400).end();
}

export default addBed;