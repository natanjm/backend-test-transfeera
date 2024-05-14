import { Timestamps } from "../generics/timestamps";

export type ReceiverModel = Timestamps & {
    pixKeyType: string;
    pixKey: string;
    email: string;
    name: string;
    cpfOrCnpj: string;
    status: "RASCUNHO" | "VALIDADO";
};
