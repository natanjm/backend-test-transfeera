import { DeleteReceivers } from "../../domain/usecases/delete-receivers";
import { DeleteReceiversRepository } from "../protocols/delete-receivers-repository";

export class DbDeleteReceiver implements DeleteReceivers{
	private readonly deleteReceiversRepository
	constructor (deleteReceiversRepository: DeleteReceiversRepository){
		this.deleteReceiversRepository = deleteReceiversRepository;
	}
	async delete(ids: string[]): Promise<number> {
		return await this.deleteReceiversRepository.delete(ids);
	}
}