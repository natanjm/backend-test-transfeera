import { MongoHelper } from "../../helpers/mongo-helper"
import { AddReceiverMongoRepository } from "./add-receiver"

describe('Add Receiver Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    const accountCollection = await MongoHelper.getCollection('receivers')
    await accountCollection.deleteMany({})
    await MongoHelper.disconnect()
  })

  const makeSut = (): AddReceiverMongoRepository => {
    return new AddReceiverMongoRepository()
  }

  test('Should return an receiver on success', async () => {
    const sut = makeSut()
    const receiver = await sut.add({
      pixKeyType: "TELEFONE",
      pixKey: "valid_pixKey",
      email: "valid_email",
      name: "valid_name",
      cpfOrCnpj: "valid_cpf_or_cnpj",
      status: "RASCUNHO"
    })
    expect(receiver).toBeTruthy();
    expect(receiver.id).toBeTruthy()
    expect(receiver.name).toBe('valid_name');
    expect(receiver.email).toBe('valid_email');
    expect(receiver.cpfOrCnpj).toBe('valid_cpf_or_cnpj');
    expect(receiver.pixKey).toBe('valid_pixKey');
    expect(receiver.pixKeyType).toBe('TELEFONE');
  })
 })