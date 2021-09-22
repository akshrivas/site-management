import db from 'src/utils/db';

export default async (req, res) => {
    const { id } = req.query;
    const { userId, categoryId, groupId, product } = req.body;
    try {
        if (req.method === 'PUT') {
            await db.collection(`products`).doc(id).update({
                ...product,
                groupId,
                categoryId,
                userId,
                updated: new Date().toISOString(),
            });
        } else if (req.method === 'DELETE') {
            await db.collection(`products`).doc(id).delete();
        }
        res.status(200).end();
    } catch (e) {
        res.status(400).end();
    }
}