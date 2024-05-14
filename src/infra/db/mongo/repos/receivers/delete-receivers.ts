import { ObjectId } from "mongodb";
import { MongoHelper } from "../../helpers/mongo-helper";
import { DeleteReceiversRepository } from "../../../../../data/protocols/delete-receivers-repository";

export class DeleteReceiversMongoRepository implements DeleteReceiversRepository{
	async delete(ids: string[]): Promise<number> {
		const receiversCollection = await MongoHelper.getCollection('receivers');
		const objectIdList = ids.map(id => new ObjectId(id));
		const result = await receiversCollection.deleteMany({ _id: { $in: objectIdList } })
		return result.deletedCount
	}
}