const baseUrl = process.env.NODE_ENV == 'production' ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3002'

const urlConstants = {
    addCategory: `${baseUrl}/api/categories`,
    addGroup: `${baseUrl}/api/groups`,
    categoryOps: `${baseUrl}/api/categories`,
    productOps: `${baseUrl}/api/products`,
    groupOps: `${baseUrl}/api/groups`
}

export default urlConstants