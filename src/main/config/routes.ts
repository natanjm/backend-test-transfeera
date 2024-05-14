import { Express, Router } from 'express';
import fg from 'fast-glob';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddReceiverController } from '../factories/add-receiver';

export default (app: Express): void => {
  const router = Router()
  fg.sync('**/src/main/routes/**routes.ts').map(async file => (await import(`../../../${file}`)).default(router))

  app.use('/api', router)
}