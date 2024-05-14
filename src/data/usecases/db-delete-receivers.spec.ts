import { DeleteReceiversRepository } from "../protocols/delete-receivers-repository";
import { DbDeleteReceiver } from "./db-delete-receivers";

const makeDeleteReceiversRepository = (): DeleteReceiversRepository => {
  class DeleteReceiversRepositoryStub implements DeleteReceiversRepository{
    async delete(ids: string[]): Promise<number> {
        const deletedDocumentsCount = ids.length;
        return new Promise(resolve => resolve(deletedDocumentsCount))
    }
  } 
  return new DeleteReceiversRepositoryStub();
}

interface SutTypes {
  sut: DbDeleteReceiver;
  deleteReceiversRepositoryStub: DeleteReceiversRepository;
}

const makeSut = (): SutTypes => {
  const deleteReceiversRepositoryStub = makeDeleteReceiversRepository();
  const sut = new DbDeleteReceiver(deleteReceiversRepositoryStub);
  return { sut, deleteReceiversRepositoryStub };
}

describe('DbDeleteReceiver Usecase', () => {
  test("Should call DeleteReceiversRepository with correct input values", async () => {
    const { sut, deleteReceiversRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(deleteReceiversRepositoryStub, "delete")

    const ids = ["1", "2"]

    await sut.delete(ids);

    expect(addSpy).toHaveBeenCalledWith(["1", "2"])
  });

  test("Should call DeleteReceiversRepository with correct values", async () => {
    const { sut } = makeSut();
    const ids = ["1", "2"]

    const response = await sut.delete(ids);

    expect(response).toEqual(2);
  });
})