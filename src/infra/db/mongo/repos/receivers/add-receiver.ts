import { AddReceiverRepository } from "../../../../../data/protocols/add-receiver-repository";
import { ReceiverModel } from "../../../../../domain/models/receiver";
import { AddReceiverInput } from "../../../../../domain/usecases/add-receiver";
import { MongoHelper } from "../../helpers/mongo-helper";

export class AddReceiverMongoRepository implements AddReceiverRepository{
	async add(receiverData: AddReceiverInput): Promise<ReceiverModel> {
		const now = new Date();
    receiverData["insertedAt"] = now;
    receiverData["updatedAt"] = now;
		
		const receiversCollection = await MongoHelper.getCollection('receivers');
		await receiversCollection.insertOne(receiverData)
		return MongoHelper.map(receiverData)
	}
}