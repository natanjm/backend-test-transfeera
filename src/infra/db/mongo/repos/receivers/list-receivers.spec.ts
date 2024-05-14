import { MongoHelper } from "../../helpers/mongo-helper"
import { AddReceiverMongoRepository } from "./add-receiver"
import { ListReceiversMongoRepository } from "./list-receivers"

describe('List Receivers Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    const {addReceiverMongoRepository} = makeSut()
    await  addReceiverMongoRepository.add({
      pixKeyType: "CNPJ",
      pixKey: "12345678901234",
      email: "example2@test.com",
      name: "Jane Smith",
      cpfOrCnpj: "12345678901234",
      status: "RASCUNHO"
    })
    await  addReceiverMongoRepository.add({
      pixKeyType: "CHAVE_ALEATORIA",
      pixKey: "123e4567-e89b-12d3-a456-426614174005",
      email: "sophia@example.com",
      name: "Sophia Taylor",
      cpfOrCnpj: "32165498745632",
      status: "VALIDADO"
    })
  })

  afterAll(async () => {
    const accountCollection = await MongoHelper.getCollection('receivers')
    await accountCollection.deleteMany({})
    await MongoHelper.disconnect()
  })


  type SutTypes = {
    addReceiverMongoRepository: AddReceiverMongoRepository,
    listReceiversMongoRepository: ListReceiversMongoRepository,
  }

  const makeSut = (): SutTypes => {
    return {
      addReceiverMongoRepository: new AddReceiverMongoRepository(),
      listReceiversMongoRepository: new ListReceiversMongoRepository()
    }
  }

  test('Should return all receiver list on success', async () => {
    const {listReceiversMongoRepository} = makeSut()
    const receiversList = await listReceiversMongoRepository.list({page: 1, pageSize: 10})
    expect(receiversList).toBeTruthy()
    expect(receiversList[1].name).toBe("Jane Smith")
    expect(receiversList[0].name).toBe("Sophia Taylor")
  });

  test('Should return the receiver list filtered by status on success', async () => {
    const {listReceiversMongoRepository} = makeSut()
    const receiversList = await listReceiversMongoRepository.list({page: 1, pageSize: 10, filters:{status: "RASCUNHO"}})
    expect(receiversList).toBeTruthy()
    expect(receiversList[0].name).toBe("Jane Smith")
    expect(receiversList[0].status).toBe("RASCUNHO")
  })

  test('Should return the receiver list filtered by name on success', async () => {
    const {listReceiversMongoRepository} = makeSut()
    const receiversList = await listReceiversMongoRepository.list({page: 1, pageSize: 10, filters:{name: "ph"}})
    expect(receiversList).toBeTruthy()
    expect(receiversList[0].name).toBe("Sophia Taylor")
  })

  test('Should return the receiver list filtered by pix key on success', async () => {
    const {listReceiversMongoRepository} = makeSut()
    const receiversList = await listReceiversMongoRepository.list({page: 1, pageSize: 10, filters:{pixKey: "-e8"}})
    expect(receiversList).toBeTruthy();
    expect(receiversList[0].name).toBe("Sophia Taylor");
    expect(receiversList[0].pixKey).toBe("123e4567-e89b-12d3-a456-426614174005");
  })

  test('Should return the receiver list filtered by pix key type on success', async () => {
    const {listReceiversMongoRepository} = makeSut()
    const receiversList = await listReceiversMongoRepository.list({
      page: 1,
      pageSize: 10,
      filters:{pixKeyType: "CNPJ"}
    });
    expect(receiversList).toBeTruthy();
    expect(receiversList[0].name).toBe("Jane Smith");
    expect(receiversList[0].pixKeyType).toBe("CNPJ");
  })

  test('Should return an empty list with filters dont match any document', async () => {
    const {listReceiversMongoRepository} = makeSut()
    const receiversList = await listReceiversMongoRepository.list({
      page: 1,
      pageSize: 10, 
      filters:{pixKeyType: "CNPJ", name: "John Doe"}
    });
    expect(receiversList).toBeTruthy();
    expect(receiversList).toHaveLength(0);
  })
 })