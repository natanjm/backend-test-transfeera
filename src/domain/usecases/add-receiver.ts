import { ReceiverModel } from "../models/receiver";

export type AddReceiverInput = {
	pixKeyType: "CPF" | "CNPJ" | "EMAIL" | "TELEFONE" | "CHAVE_ALEATORIA";
	pixKey: string;
	email: string;
	name: string;
	cpfOrCnpj: string;
	status: "RASCUNHO" | "VALIDADO"
}

export interface AddReceiver {
	add(receiver: AddReceiverInput): Promise<ReceiverModel>;
}

