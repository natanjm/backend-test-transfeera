import { ReceiverModel } from "../../domain/models/receiver";
import { AddReceiverInput } from "../../domain/usecases/add-receiver";
import { ListReceiversParams } from "../../domain/usecases/list-receivers";
import { AddReceiverRepository } from "../protocols/add-receiver-repository";
import { ListReceiversRepository } from "../protocols/list-receivers-repository";
import { DbListReceivers } from "./db-list-receivers";

const makeListReceiversRepository = (): ListReceiversRepository => {
  class ListReceiversRepositoryStub implements ListReceiversRepository{
    async list(_receiverData: ListReceiversParams): Promise<ReceiverModel[]> {
        var fixedDate = new Date('2024-01-01T00:00:00');
        const fakeReceivers = [{
          pixKeyType: "valid_pixKeyType",
          pixKey: "valid_pixKey",
          email: "valid_email",
          name: "valid_name",
          cpfOrCnpj: "valid_cpfOrCnpj",
          status: "RASCUNHO",
          id: "valid_id",
          insertedAt: fixedDate,
          updatedAt: fixedDate
      }] as ReceiverModel[];
        return new Promise(resolve => resolve(fakeReceivers))
    }
  } 
  return new ListReceiversRepositoryStub();
}

interface SutTypes {
  sut: DbListReceivers;
  listReceiversRepositoryStub: ListReceiversRepository;
}

const makeSut = (): SutTypes => {
  const listReceiversRepositoryStub = makeListReceiversRepository();
  const sut = new DbListReceivers(listReceiversRepositoryStub);
  return { sut, listReceiversRepositoryStub };
}

describe('DbListReceivers Usecase', () => {
  test("Should call ListReceiversRepository with correct input values", async () => {
    const { sut, listReceiversRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(listReceiversRepositoryStub, "list")

    const params = {
      filters: {
        name: "valid_name"
      },
      page: 1,
      pageSize: 10
    }

    await sut.list(params);

    expect(addSpy).toHaveBeenCalledWith({
      filters: {
        name: "valid_name"
      },
      page: 1,
      pageSize: 10
    })
  });

  test("Should call ListReceiversRepository with correct values", async () => {
    const { sut } = makeSut();
    
    const params = {
      filters: {
        name: "valid_name"
      },
      page: 1,
      pageSize: 10
    }

    const receiver = await sut.list(params);

    expect(receiver).toEqual([{
      "cpfOrCnpj": "valid_cpfOrCnpj", 
      "email": "valid_email",
      "id": "valid_id",
      "insertedAt": new Date('2024-01-01T00:00:00'),
      "name": "valid_name",
      "pixKey": "valid_pixKey",
      "pixKeyType": "valid_pixKeyType",
      "status": "RASCUNHO",
      "updatedAt": new Date('2024-01-01T00:00:00')
    }])
  });
})