import { DbListReceivers } from "../../data/usecases/db-list-receivers";
import { ListReceiversMongoRepository } from "../../infra/db/mongo/repos/receivers/list-receivers";
import { ListReceiversController } from "../../presentation/controllers/receivers/list-receivers";
import { Controller } from "../../presentation/protocols";

export const makeListReceiversController = (): Controller => {
	const listReceiversRepository = new ListReceiversMongoRepository();
	const listReceivers = new DbListReceivers(listReceiversRepository);
	const listReceiversController = new ListReceiversController(listReceivers);
	return listReceiversController;
}