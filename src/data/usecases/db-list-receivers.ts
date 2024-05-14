import { ReceiverModel } from "../../domain/models/receiver";
import { ListReceivers, ListReceiversParams } from "../../domain/usecases/list-receivers";
import { ListReceiversRepository } from "../protocols/list-receivers-repository";

export class DbListReceivers implements ListReceivers{
	private readonly listReceiversRepository: ListReceiversRepository
	constructor (listReceiversRepository: ListReceiversRepository){
		this.listReceiversRepository = listReceiversRepository;
	}
	
	async list(params: ListReceiversParams): Promise<ReceiverModel[]> {
		return await this.listReceiversRepository.list(params);
	}
}