import { DbEditReceiver } from "../../data/usecases/db-edit-receiver";
import { EditReceiversMongoRepository } from "../../infra/db/mongo/repos/receivers/edit-receiver";
import { EditReceiverController } from "../../presentation/controllers/receivers/edit-receiver";
import { Controller } from "../../presentation/protocols";

export const makeEditReceiverController = (): Controller => {
	const editReceiverRepository = new EditReceiversMongoRepository();
	const editReceiver = new DbEditReceiver(editReceiverRepository);
	const editReceiverController = new EditReceiverController(editReceiver);
	return editReceiverController;
}