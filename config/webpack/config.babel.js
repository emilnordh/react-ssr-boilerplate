import dotenv from 'dotenv';
import production from './config.production';
import development from './config.development';

dotenv.config();

export default process.env.NODE_ENV === 'production' ? production : development;
