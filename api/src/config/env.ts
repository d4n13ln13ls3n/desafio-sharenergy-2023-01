import 'dotenv/config';

export default {
  port: process.env.APP_PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'jwt_secret',
  username: process.env.MONGO_USER || 'admin',
  password: process.env.MONGO_PASSWORD || 'admin',
  host: process.env.MONGO_HOST || 'localhost',
  database: process.env.MONGO_DATABASE || 'ShareEnergy',
  mongoUrl: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/ShareEnergy',
  dbPort: process.env.MONGO_DB_PORT || 27017,
};