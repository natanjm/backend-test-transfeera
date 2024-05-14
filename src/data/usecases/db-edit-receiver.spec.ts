import { ReceiverModel } from "../../domain/models/receiver";
import { AddReceiverInput } from "../../domain/usecases/add-receiver";
import { EditReceiverInput } from "../../domain/usecases/edit-receiver";
import { AddReceiverRepository } from "../protocols/add-receiver-repository";
import { EditReceiverRepository } from "../protocols/edit-receiver-repository";
import { DbAddReceiver } from "./db-add-receiver";
import { DbEditReceiver } from "./db-edit-receiver";

const makeEditReceiverRepository = (): EditReceiverRepository => {
  class EditReceiverRepositoryStub implements EditReceiverRepository{
    async edit(_receiverData: EditReceiverInput): Promise<ReceiverModel> {
        var fixedDate = new Date('2024-01-01T00:00:00');
        const fakeReceiver = {
          pixKeyType: "valid_pixKeyType",
          pixKey: "valid_pixKey",
          email: "valid_email_edited",
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
  return new EditReceiverRepositoryStub();
}

interface SutTypes {
  sut: DbEditReceiver;
  editReceiverRepositoryStub: EditReceiverRepository;
}

const makeSut = (): SutTypes => {
  const editReceiverRepositoryStub = makeEditReceiverRepository();
  const sut = new DbEditReceiver(editReceiverRepositoryStub);
  return { sut, editReceiverRepositoryStub };
}

describe('DbEditReceiver Usecase', () => {
  test("Should call EditReceiverRepository with correct input values", async () => {
    const { sut, editReceiverRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(editReceiverRepositoryStub, "edit")

    const editReceiverData = {
      id: "1",
      email: "valid_email_edited",
    };

    await sut.edit(editReceiverData);

    expect(addSpy).toHaveBeenCalledWith({
      id: "1",
      email: "valid_email_edited",
    })
  });

  test("Should call EditReceiverRepository with correct values", async () => {
    const { sut } = makeSut();
    
    const editReceiverData = {
      id: "1",
      email: "valid_email_edited",
    };

    const receiver = await sut.edit(editReceiverData);

    expect(receiver).toEqual({
      "cpfOrCnpj": "valid_cpfOrCnpj", 
      "email": "valid_email_edited",
      "id": "valid_id",
      "insertedAt": new Date('2024-01-01T00:00:00'),
      "name": "valid_name",
      "pixKey": "valid_pixKey",
      "pixKeyType": "valid_pixKeyType",
      "status": "RASCUNHO",
      "updatedAt": new Date('2024-01-01T00:00:00')})
  });
})