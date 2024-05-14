import { AddReceiver } from "../../../domain/usecases/add-receiver";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import { validateCpfOrCnpj, validateEmail, validatePixKey, validatePixKeyType } from "../../helpers/validators";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class AddReceiverController implements Controller{
	private readonly addReceiver: AddReceiver
	constructor (addReceiver: AddReceiver) {
			this.addReceiver = addReceiver;
	}
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requiredFields = ["pixKeyType", "pixKey", "name", "cpfOrCnpj"];
			for (const field of requiredFields) {
				if (!httpRequest.body[field]) {
					return badRequest(new MissingParamError(field));
				}
			}
			const validationErrors = [];
			const {pixKeyType, pixKey, email, name, cpfOrCnpj} = httpRequest.body;
			if (!validateCpfOrCnpj(cpfOrCnpj)){
				validationErrors.push(new InvalidParamError("cpfOrCnpj"));
			}
			if(!validateEmail(email)){
				validationErrors.push(new InvalidParamError("email"));
			}
			if(!validatePixKeyType(pixKeyType)){
				validationErrors.push(new InvalidParamError("pixKeyType"));
			} else if(!validatePixKey(pixKey, pixKeyType)){
				validationErrors.push(new InvalidParamError("pixKey"));
			}
			if(validationErrors.length > 0){
				return badRequest(validationErrors);
			}

			const receiver = await this.addReceiver.add({
				pixKeyType,
				pixKey,
				email,
				name,
				cpfOrCnpj,
				status: "RASCUNHO"
			})
			return ok(receiver)
		} catch(error){
			return serverError(error);
		}
	}
}