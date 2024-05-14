import { DeleteReceivers } from "../../../domain/usecases/delete-receivers";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, ok, serverError } from "../../helpers/http-helper";
import { validateStringArray } from "../../helpers/validators";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class DeleteReceiversController implements Controller{
	private readonly deleteReceivers;
	constructor (deleteReceivers: DeleteReceivers){
		this.deleteReceivers = deleteReceivers;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requiredField = "ids";
			if (!httpRequest.body[requiredField]) {
				return badRequest(new MissingParamError(requiredField));
			}
			const {ids} = httpRequest.body;
			if (!validateStringArray(ids)){
				return badRequest(new InvalidParamError("ids"));
			}
			const deletedReceiversCount = await this.deleteReceivers.delete(ids);
			return ok({deletedReceiversCount})
		} catch(error){
			return serverError(error);
		}
	}
}