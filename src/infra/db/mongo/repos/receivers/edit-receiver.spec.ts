import { MongoHelper } from "../../helpers/mongo-helper"
import { AddReceiverMongoRepository } from "./add-receiver"
import { EditReceiversMongoRepository } from "./edit-receiver"

describe('Edit Receiver Mongo Repository', () => {
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
    editReceiverMongoRepository: EditReceiversMongoRepository,
  }

  const makeSut = (): SutTypes => {
    return {
      addReceiverMongoRepository: new AddReceiverMongoRepository(),
      editReceiverMongoRepository: new EditReceiversMongoRepository()
    }
  }

  test('Should return the updated receiver on success', async () => {
    const {addReceiverMongoRepository, editReceiverMongoRepository} = makeSut()
    const receiver = await addReceiverMongoRepository.add({
      pixKeyType: "TELEFONE",
      pixKey: "valid_pixKey",
      email: "valid_email",
      name: "valid_name",
      cpfOrCnpj: "valid_cpf_or_cnpj",
      status: "RASCUNHO"
    })
    expect(receiver).toBeTruthy();
    const editedReceiver = await editReceiverMongoRepository.edit({
      id: receiver.id, 
      email: "my_new_email",
      pixKeyType: "CHAVE_ALEATORIA",
      pixKey: "123e4567-e89b-12d3-a456-426614174005",
      cpfOrCnpj: "12345678901234",
      name: "my new name"
    })
    expect(editedReceiver).toBeTruthy();
    expect(editedReceiver.email).toBe("my_new_email");
    expect(editedReceiver.pixKeyType).toBe("CHAVE_ALEATORIA");
    expect(editedReceiver.pixKey).toBe("123e4567-e89b-12d3-a456-426614174005");
    expect(editedReceiver.cpfOrCnpj).toBe("12345678901234");
    expect(editedReceiver.name).toBe("my new name");
  })

  test('Should return error when a receiver with status equals to VALIDADO tries to update data that is not email', async () => {
    const {addReceiverMongoRepository, editReceiverMongoRepository} = makeSut()
    const receiver = await addReceiverMongoRepository.add({
      pixKeyType: "TELEFONE",
      pixKey: "valid_pixKey",
      email: "valid_email",
      name: "valid_name",
      cpfOrCnpj: "valid_cpf_or_cnpj",
      status: "VALIDADO"
    })
    expect(receiver).toBeTruthy();
    const promise = editReceiverMongoRepository.edit({
      id: receiver.id,
      pixKeyType: "CHAVE_ALEATORIA",
      pixKey: "123e4567-e89b-12d3-a456-426614174005",
      cpfOrCnpj: "12345678901234",
      name: "my new name"
    })
    await expect(promise).rejects.toThrow('Only email can be edited for documents with status "VALIDADO"')
  })

  test('Should update validated receiver email on success', async () => {
    const {addReceiverMongoRepository, editReceiverMongoRepository} = makeSut()
    const receiver = await addReceiverMongoRepository.add({
      pixKeyType: "TELEFONE",
      pixKey: "valid_pixKey",
      email: "valid_email",
      name: "valid_name",
      cpfOrCnpj: "valid_cpf_or_cnpj",
      status: "VALIDADO"
    })
    expect(receiver).toBeTruthy();
    const updatedReceiver = await editReceiverMongoRepository.edit({
      id: receiver.id,
      email: "my new email"
    })
    expect(updatedReceiver).toBeTruthy();
    expect(updatedReceiver.id).toBeTruthy()
    expect(updatedReceiver.name).toBe('valid_name');
    expect(updatedReceiver.email).toBe('my new email');
    expect(updatedReceiver.cpfOrCnpj).toBe('valid_cpf_or_cnpj');
    expect(updatedReceiver.pixKey).toBe('valid_pixKey');
    expect(updatedReceiver.pixKeyType).toBe('TELEFONE');
  })

  test('Should return null when the provided id does not exists', async () => {
    const { editReceiverMongoRepository} = makeSut()
    const updatedReceiver = await editReceiverMongoRepository.edit({
      id: "66420c0ff6f16edb7a297ba5",
      email: "my new email"
    })
    expect(updatedReceiver).toBeNull();
  })
 })