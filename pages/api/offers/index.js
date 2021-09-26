import db from 'src/utils/db';

export default async (request, response) => {
    const { data } = request.body;
    if (data) {
        try {
            let { userId, offer } = data;
            const { id } = await db.collection(`users/${userId}/offers`).add({
                ...offer,
                userId,
                created: new Date().toISOString(),
            });
            response.status(200).json({ id, message: 'success' });
        } catch (e) {
            response.status(400).end();
        }
    }
    else response.status(400).end();
}