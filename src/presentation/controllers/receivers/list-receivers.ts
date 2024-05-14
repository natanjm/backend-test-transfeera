import { ListReceivers } from "../../../domain/usecases/list-receivers";
import { ok, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

const DEFAULT_PAGE_SIZE = 10

export class ListReceiversController implements Controller{
	private readonly listReceivers;
	constructor (listReceivers: ListReceivers){
			this.listReceivers = listReceivers;
	}
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const page = httpRequest.body.page ? httpRequest.body.page : 0;
			const params = {
				filters: {
					name: httpRequest.body?.name,
					status: httpRequest.body?.status,
					pixKeyType: httpRequest.body?.pixKeyType,
					pixKey: httpRequest.body?.pixKey
				},
				page,
				pageSize: DEFAULT_PAGE_SIZE
			}
			const response = await this.listReceivers.list(params)

			return ok(response);
		} catch (error) {
			return serverError(error);
		}
	}
}