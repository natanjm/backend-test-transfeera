import { ReceiverModel } from "../models/receiver";

export type EditReceiverInput = {
	id: string;
	pixKeyType?: "CPF" | "CNPJ" | "EMAIL" | "TELEFONE" | "CHAVE_ALEATORIA";
	pixKey?: string;
	email?: string;
	name?: string;
	cpfOrCnpj?: string;
}
export interface EditReceiver {
	edit(params: EditReceiverInput): Promise<ReceiverModel>
}