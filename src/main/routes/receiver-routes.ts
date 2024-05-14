import { Router } from 'express';
import { adaptRoute } from '../adapters/express-route-adapter';
import { makeAddReceiverController } from '../factories/add-receiver';
import { makeDeleteReceiversController } from '../factories/delete-receiver';
import { makeListReceiversController } from '../factories/list-receivers';
import { makeEditReceiverController } from '../factories/edit-receiver';

export default (router: Router): void => {
  router.get("/receivers", adaptRoute(makeListReceiversController()));
  router.post('/receivers', adaptRoute(makeAddReceiverController()));
  router.patch('/receivers/:id', adaptRoute(makeEditReceiverController()));
  router.delete("/receivers", adaptRoute(makeDeleteReceiversController()));
}