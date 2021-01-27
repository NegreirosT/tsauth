import { createConnection } from 'typeorm';

createConnection()
                .then(() => '🗡  Successfully connected with database.');