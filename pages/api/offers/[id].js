import db from 'src/utils/db';

export default async (req, res) => {
    const { id } = req.query;
    const { userId, offer } = req.body;
    try {
        if (req.method === 'PUT') {
            await db.collection(`users/${userId}/offers`).doc(id).update({
                ...offer,
                userId,
                updated: new Date().toISOString(),
            });
        } else if (req.method === 'DELETE') {
            await db.collection(`users/${userId}/offers`).doc(id).delete();
        }
        res.status(200).end();
    } catch (e) {
        res.status(400).end();
    }
}