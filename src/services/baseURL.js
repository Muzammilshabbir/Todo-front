export const BASE_URL =
  process.env.NEXT_PUBLIC_ENV == 'staging'
    ? process.env.NEXT_PUBLIC_BASE_STAGING_API_URL
    : process.env.NEXT_PUBLIC_ENV == 'production'
    ? process.env.NEXT_PUBLIC_BASE_PRODUCTION_API_URL
    : process.env.NEXT_PUBLIC_ENV == 'development'
    ? process.env.NEXT_PUBLIC_BASE_LOCAL_API_URL
    : "http://localhost:8000"
