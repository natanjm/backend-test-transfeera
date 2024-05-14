import { ReceiverModel } from "../../domain/models/receiver";
import { ListReceiversParams } from "../../domain/usecases/list-receivers";

export interface ListReceiversRepository {
	list(filters: ListReceiversParams): Promise<ReceiverModel[]>;
}