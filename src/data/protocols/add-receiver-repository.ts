import { ReceiverModel } from "../../domain/models/receiver";
import { AddReceiverInput } from "../../domain/usecases/add-receiver";

export interface AddReceiverRepository{
	add(receiverData: AddReceiverInput): Promise<ReceiverModel>
}