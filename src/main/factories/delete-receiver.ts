import { DbDeleteReceiver } from "../../data/usecases/db-delete-receivers";
import { DeleteReceiversMongoRepository } from "../../infra/db/mongo/repos/receivers/delete-receivers";
import { DeleteReceiversController } from "../../presentation/controllers/receivers/delete-receivers";
import { Controller } from "../../presentation/protocols";

export const makeDeleteReceiversController = ():Controller => {
	const deleteReceiversRepository = new DeleteReceiversMongoRepository();
	const deleteReceivers = new DbDeleteReceiver(deleteReceiversRepository);
	const deleteReceiversController = new DeleteReceiversController(deleteReceivers)
	return deleteReceiversController;
}