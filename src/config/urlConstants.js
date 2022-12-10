const baseUrl = process.env.NODE_ENV == 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000'

const urlConstants = {
    categoryOps: `${baseUrl}/api/categories`,
    productOps: `${baseUrl}/api/products`,
    groupOps: `${baseUrl}/api/groups`,
    offerOps: `${baseUrl}/api/offers`,
    bedOps: `${baseUrl}/api/beds`,
}

export default urlConstants