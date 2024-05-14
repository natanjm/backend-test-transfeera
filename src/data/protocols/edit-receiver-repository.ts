import { ReceiverModel } from "../../domain/models/receiver";
import { EditReceiverInput } from "../../domain/usecases/edit-receiver";

export interface EditReceiverRepository {
	edit(params: EditReceiverInput): Promise<ReceiverModel>
}