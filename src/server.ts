import dotenv from 'dotenv';
import { App } from './app';
import MongoConnection from './utils/mongo-connection';
import logger from './utils/logger';
import * as http from "http";

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

const mongoConnection = new MongoConnection(process.env.MONGO_URL);

export const app = App.bootstrap().app;
export let server: http.Server;

if (process.env.MONGO_URL == null) {
  logger.error('MONGO_URL not specified in environment');
  process.exit(1);
} else {
  mongoConnection.connect(() => {
    server = app.listen(app.get('port'), (): void => {
      console.log('\x1b[36m%s\x1b[0m', // eslint-disable-line
        `🌏 Express server started at http://localhost:${app.get('port')}`);
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'stage') {
        console.log('\x1b[36m%s\x1b[0m', // eslint-disable-line
          `⚙️  Swagger UI hosted at http://localhost:${app.get('port')}/api/dev/api-docs`);
      }
    });
  });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  logger.info('Gracefully shutting down');
  mongoConnection.close((err) => {
    if (err) {
      logger.log({
        level: 'error',
        message: 'Error shutting closing mongo connection',
        error: err
      });
    }
    process.exit(0);
  });
});
