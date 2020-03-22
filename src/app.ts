import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { ApplicationError } from './utils/applicationError';
import { ApiRoutes } from './routes';



export class App {
  public static bootstrap(): App {
    return new App();
  }

  public app: express.Application;

  constructor() {
    // create expressjs application
    this.app = express();

    // configure application
    this.config();

    // add routes
    this.routes();
  }

  public config() {
    this.app.set('port', process.env.PORT || 3000);

    // add static paths
    this.app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

    // mount json form parser
    this.app.use(bodyParser.json({ limit: '1mb' }));

    // mount query string parser
    this.app.use(
        bodyParser.urlencoded({
          extended: true,
        }),
    );

    // mount override?
    this.app.use(helmet());
    this.app.use(compression());


    this.app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) {
        return next(err);
      }

      return res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'development' ? err : undefined,
        message: err.message
      });
    });

    // catch 404 and forward to error handler
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      err.status = 404;
      next(err);
    });

  }

  private routes() {
    // use router middleware
    this.app.use(ApiRoutes.path, ApiRoutes.router);
  }
}

