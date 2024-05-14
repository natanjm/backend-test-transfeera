import { ListReceiversRepository } from "../../../../../data/protocols/list-receivers-repository";
import { ReceiverModel } from "../../../../../domain/models/receiver";
import { ListReceiversParams } from "../../../../../domain/usecases/list-receivers";
import { MongoHelper } from "../../helpers/mongo-helper";

export class ListReceiversMongoRepository implements ListReceiversRepository{
	async list({page, pageSize, filters}: ListReceiversParams): Promise<ReceiverModel[]> {
		const query: any = {};
		const ilikeFilterFields = ["name", "pixKey"]
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          if (ilikeFilterFields.includes(key)) {
            query[key] = { $regex: new RegExp(value, "i") };
          } else {
            query[key] = value;
          }
        }
      }
    }

		const receiversCollection = await MongoHelper.getCollection("receivers");
		const skip = page > 0 ? ((page - 1) * pageSize) : 0;

		const documents = await receiversCollection.find(query)
			.skip(skip)
			.limit(pageSize)
			.sort({insertedAt: -1})
			.toArray();

		return documents.map((document) => MongoHelper.map(document))
	}
}