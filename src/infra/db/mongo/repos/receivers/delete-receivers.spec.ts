import { MongoHelper } from "../../helpers/mongo-helper"
import { AddReceiverMongoRepository } from "./add-receiver"
import { DeleteReceiversMongoRepository } from "./delete-receivers"

describe('Delete Receiver Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    const accountCollection = await MongoHelper.getCollection('receivers')
    await accountCollection.deleteMany({})
    await MongoHelper.disconnect()
  })

  type SutTypes = {
    addReceiverMongoRepository: AddReceiverMongoRepository,
    deleteReceiversMongoRepository: DeleteReceiversMongoRepository,
  }

  const makeSut = (): SutTypes => {
    return {
      addReceiverMongoRepository: new AddReceiverMongoRepository(),
      deleteReceiversMongoRepository: new DeleteReceiversMongoRepository()
    }
  }

  test('Should return the quantity of deleted receivers on success', async () => {
    const {addReceiverMongoRepository, deleteReceiversMongoRepository} = makeSut()
    const receiver = await addReceiverMongoRepository.add({
      pixKeyType: "TELEFONE",
      pixKey: "valid_pixKey",
      email: "valid_email",
      name: "valid_name",
      cpfOrCnpj: "valid_cpf_or_cnpj",
      status: "RASCUNHO"
    })
    expect(receiver).toBeTruthy();
    const deletedReceiversCount = await deleteReceiversMongoRepository.delete([receiver.id])
    expect(deletedReceiversCount).toBe(1)
  })
 })