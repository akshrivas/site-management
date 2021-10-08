import db from 'src/utils/db';

export default async (request, response) => {
  const { data } = request.body;
  if (data) {
    try {
      let { userId, categoryId, group } = data;
      const docRef = db
        .collection(`users/${userId}/categories`)
        .doc(categoryId);
      const doc = await docRef.get();
      const result = await doc.data();
      const { groups = [], ...rest } = result;

      if (groups.some(({ name }) => name == group.name)) {
        res.status(400).end();
      } else {
        const updatedData = {
          ...rest,
          groups: [
            ...groups,
            {
              id: group.name
                .split(' ')
                .map((item) => item.toLowerCase())
                .join('-'),
              ...group,
              created: new Date().toISOString(),
            },
          ],
          updated: new Date().toISOString(),
        };

        await docRef.set({
          ...updatedData
        });

        response.status(200).json({ id: true, message: 'success' });
      }
    } catch (e) {
      console.log(e);
      response.status(400).end();
    }
  } else response.status(400).end();
};
