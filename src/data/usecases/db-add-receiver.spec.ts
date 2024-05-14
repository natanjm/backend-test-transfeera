import { ReceiverModel } from "../../domain/models/receiver";
import { AddReceiverInput } from "../../domain/usecases/add-receiver";
import { AddReceiverRepository } from "../protocols/add-receiver-repository";
import { DbAddReceiver } from "./db-add-receiver";

const makeAddReceiverRepository = (): AddReceiverRepository => {
  class AddReceiverRepositoryStub implements AddReceiverRepository{
    async add(_receiverData: AddReceiverInput): Promise<ReceiverModel> {
        var fixedDate = new Date('2024-01-01T00:00:00');
        const fakeReceiver = {
          pixKeyType: "valid_pixKeyType",
          pixKey: "valid_pixKey",
          email: "valid_email",
          name: "valid_name",
          cpfOrCnpj: "valid_cpfOrCnpj",
          status: "RASCUNHO",
          id: "valid_id",
          insertedAt: fixedDate,
          updatedAt: fixedDate
      } as ReceiverModel;
        return new Promise(resolve => resolve(fakeReceiver))
    }
  } 
  return new AddReceiverRepositoryStub();
}

interface SutTypes {
  sut: DbAddReceiver;
  addReceiverRepositoryStub: AddReceiverRepository;
}

const makeSut = (): SutTypes => {
  const addReceiverRepositoryStub = makeAddReceiverRepository();
  const sut = new DbAddReceiver(addReceiverRepositoryStub);
  return { sut, addReceiverRepositoryStub };
}

describe('DbAddReceiver Usecase', () => {
  test("Should call AddReceiverRepository with correct input values", async () => {
    const { sut, addReceiverRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addReceiverRepositoryStub, "add")

    const receiverData = {
      pixKeyType: "TELEFONE",
      pixKey: "valid_pixKey",
      email: "valid_email",
      name: "valid_name",
      cpfOrCnpj: "valid_cpf_or_cnpj",
      status: "RASCUNHO"
    } as AddReceiverInput;

    await sut.add(receiverData);

    expect(addSpy).toHaveBeenCalledWith({
          "cpfOrCnpj": "valid_cpf_or_cnpj",
          "email": "valid_email",
          "name": "valid_name",
          "pixKey": "valid_pixKey",
          "pixKeyType": "TELEFONE",
          "status": "RASCUNHO",
        })
  });

  test("Should call AddReceiverRepository with correct values", async () => {
    const { sut } = makeSut();
    const receiverData = {
      pixKeyType: "TELEFONE",
      pixKey: "valid_pixKey",
      email: "valid_email",
      name: "valid_name",
      cpfOrCnpj: "valid_cpf_or_cnpj"
    } as AddReceiverInput;

    const receiver = await sut.add(receiverData);

    expect(receiver).toEqual({
      "cpfOrCnpj": "valid_cpfOrCnpj", 
      "email": "valid_email",
      "id": "valid_id",
      "insertedAt": new Date('2024-01-01T00:00:00'),
      "name": "valid_name",
      "pixKey": "valid_pixKey",
      "pixKeyType": "valid_pixKeyType",
      "status": "RASCUNHO",
      "updatedAt": new Date('2024-01-01T00:00:00')})
  });
})