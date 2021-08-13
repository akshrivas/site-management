import db from 'src/utils/db';

export default async (request, response) => {
  try {
    const citiesDoc = await db.collection('cities').get();
    const cities = citiesDoc.docs.map(city => ({
      id: city.id,
      ...city.data()
    }));
    response.status(200).json({ cities });
  } catch (e) {
    response.status(400).end();
  }
}