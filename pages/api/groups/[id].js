import remove from 'lodash/remove';
import uniqBy from 'lodash/uniqBy';
import db from 'src/utils/db';

export default async (req, res) => {
  const { id: groupId } = req.query;
  const { userId, categoryId, group } = req.body;

  try {
    const docRef = db.collection(`users/${userId}/categories`).doc(categoryId);
    const doc = await docRef.get();
    const result = await doc.data();
    const { groups = [], ...rest } = result;

    let updatedGroups = null;

    if (req.method === 'PUT') {
      updatedGroups = uniqBy([group, ...groups], 'id');
    } else if (req.method === 'DELETE') {
      remove(groups, ({ id }) => id === groupId);
      updatedGroups = groups;
    }

    console.log(updatedGroups);

    await docRef.set({
      ...rest,
      groups: updatedGroups,
      updated: new Date().toISOString(),
    });

    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
