import { ReceiverModel } from "../../domain/models/receiver";
import { AddReceiver, AddReceiverInput } from "../../domain/usecases/add-receiver";
import { AddReceiverRepository } from "../protocols/add-receiver-repository";

export class DbAddReceiver implements AddReceiver{
	private readonly addReceiverRepository
	constructor (addReceiverRepository: AddReceiverRepository){
		this.addReceiverRepository = addReceiverRepository;
	}
	async add(receiverData: AddReceiverInput): Promise<ReceiverModel> {
		return await this.addReceiverRepository.add(receiverData)
	}
}