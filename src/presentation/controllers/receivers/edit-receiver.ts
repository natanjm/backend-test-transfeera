import { EditReceiver } from "../../../domain/usecases/edit-receiver";
import { ConflictError, InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, notFound, ok, serverError } from "../../helpers/http-helper";
import {
  validateCpfOrCnpj,
  validateEmail,
  validateMongoDbId,
  validatePixKey,
  validatePixKeyType
} from "../../helpers/validators";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class EditReceiverController implements Controller {
  constructor(private readonly editReceiver: EditReceiver) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body, params } = httpRequest;

			if(!validateMongoDbId(params?.id)){
				return badRequest(new InvalidParamError("id"))
			}

      const hasPixKey = body?.pixKey !== undefined;
      const hasPixKeyType = body?.pixKeyType !== undefined;

      if (hasPixKey !== hasPixKeyType) {
        const missingParam = hasPixKey ? "pixKeyType" : "pixKey";
        return badRequest(new MissingParamError(missingParam));
      }

      const validationErrors = [];

      if (body?.cpfOrCnpj && !validateCpfOrCnpj(body?.cpfOrCnpj)) {
        validationErrors.push(new InvalidParamError("cpfOrCnpj"));
      }

      if (body?.email && !validateEmail(body?.email)) {
        validationErrors.push(new InvalidParamError("email"));
      }

      if (hasPixKey && hasPixKeyType) {
        if (!validatePixKeyType(body?.pixKeyType)) {
          validationErrors.push(new InvalidParamError("pixKeyType"));
        } else if (!validatePixKey(body?.pixKey, body?.pixKeyType)) {
          validationErrors.push(new InvalidParamError("pixKey"));
        }
      }

      if (validationErrors.length > 0) {
        return badRequest(validationErrors);
      }

      const editReceiverParams = {
        id: params?.id,
        pixKeyType: body?.pixKeyType,
        pixKey: body?.pixKey,
        email: body?.email,
        name: body?.name,
        cpfOrCnpj: body?.cpfOrCnpj
    	};

			const response = await this.editReceiver.edit(editReceiverParams)
			if (response === null){
				return notFound("Receiver not found");
			}

			return ok(response);
    } catch (error) {
			const conflictErrors = [
				'Only email can be edited for documents with status "VALIDADO"',
				'Only receiver with RASCUNHO or VALIDADO status can be edited'
			]

			if(conflictErrors.includes(error.message)){
				return badRequest(new ConflictError(error.message));
			}
      return serverError(error);
    }
  }
}
