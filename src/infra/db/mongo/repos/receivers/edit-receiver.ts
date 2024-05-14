import { ObjectId } from "mongodb";
import { EditReceiverRepository } from "../../../../../data/protocols/edit-receiver-repository";
import { ReceiverModel } from "../../../../../domain/models/receiver";
import { EditReceiverInput } from "../../../../../domain/usecases/edit-receiver";
import { MongoHelper } from "../../helpers/mongo-helper";

export class EditReceiversMongoRepository implements EditReceiverRepository{
	async edit(params: EditReceiverInput): Promise<ReceiverModel> {
		const receiversCollection = await MongoHelper.getCollection('receivers');
		const receiverId = new ObjectId(params.id)
		const receiverDoc = await receiversCollection.findOne({_id: receiverId})

		if (!receiverDoc) {
			return null;
		}

		const receiver = MongoHelper.map(receiverDoc) as ReceiverModel;

		params["id"] = null;
    params["updatedAt"] = new Date();
		const updates = Object.fromEntries(
			Object.entries(params).filter(([_, value]) => value !== undefined && value !== null)
		)

		let response;
		if (receiver.status === 'RASCUNHO') {
			response = await receiversCollection.findOneAndUpdate({ _id: receiverId }, 
				{ $set: updates }, 
				{ returnDocument: 'after' });
		} else if (receiver.status === "VALIDADO") {
			if (updates.email) {
				response = await receiversCollection.findOneAndUpdate(
					{ _id: receiverId }, 
					{ $set: { email: updates.email } }, 
					{ returnDocument: 'after' });
			} else {
				throw new Error('Only email can be edited for documents with status "VALIDADO"');
			}
		} else {
			throw new Error('Only receiver with RASCUNHO or VALIDADO status can be edited');
		}

		return MongoHelper.map(response.value);
	}
}