import { DbAddReceiver } from "../../data/usecases/db-add-receiver";
import { AddReceiverMongoRepository } from "../../infra/db/mongo/repos/receivers/add-receiver";
import { AddReceiverController } from "../../presentation/controllers/receivers/add-receiver";
import { Controller } from "../../presentation/protocols";

export const makeAddReceiverController = (): Controller => {
	const addReceiverRepository = new AddReceiverMongoRepository();
	const addReceiver = new DbAddReceiver(addReceiverRepository);
	const addReceiverController = new AddReceiverController(addReceiver)
	return addReceiverController;
}