require('dotenv').config();

export default {
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    uri: process.env.DATABASE_URI || '',
  },
  app: {
    domain: process.env.DOMAIN,
  },
};
