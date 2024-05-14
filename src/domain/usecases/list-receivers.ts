import { ReceiverModel } from "../models/receiver";

export type ListReceiversParams = {
	filters?: {
		name?: string;
		status?: "RASCUNHO" | "VALIDADO";
		pixKeyType?: "CPF" | "CNPJ" | "EMAIL" | "TELEFONE" | "CHAVE_ALEATORIA";
		pixKey?: string;
	},
	page: number;
	pageSize: number;
}

export interface ListReceivers{
	list(filters: ListReceiversParams): Promise<ReceiverModel[]>;
}