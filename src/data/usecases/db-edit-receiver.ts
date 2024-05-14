import { ReceiverModel } from "../../domain/models/receiver";
import { EditReceiver, EditReceiverInput } from "../../domain/usecases/edit-receiver";
import { EditReceiverRepository } from "../protocols/edit-receiver-repository";

export class DbEditReceiver implements EditReceiver{
	private readonly editReceiverRepository;
	constructor (editReceiverRepository: EditReceiverRepository){
		this.editReceiverRepository = editReceiverRepository;
	}

	async edit(params: EditReceiverInput): Promise<ReceiverModel> {
		return this.editReceiverRepository.edit(params);
	}
}