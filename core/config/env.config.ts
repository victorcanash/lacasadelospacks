const envConfig = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Ecommerce',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api',
  NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL || 'info@gmail.com',
};

export default envConfig;
