import request from 'supertest';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongo/helpers/mongo-helper';

describe('Add receiver route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    const accountCollection = await MongoHelper.getCollection('receivers');
    await accountCollection.deleteMany({});
    await MongoHelper.disconnect();
  });

  test('Should return an receiver on success', async () => {
    await request(app)
      .post('/api/receivers')
      .send({
        "name": "Safira Erbes",
        "email": "serbes@gmail.com",
        "cpfOrCnpj": "92940093000152",
        "pixKeyType": "TELEFONE",
        "pixKey": "5551999223232"
      })
      .expect(200)
  });

  test('Should return an error when any required parameter is forgotten', async () => {
    const requiredFields = ["pixKeyType", "pixKey", "name", "cpfOrCnpj", "email"];
    const params = {
      "name": "Safira Erbes",
      "email": "serbes@gmail.com",
      "cpfOrCnpj": "92940093000152",
      "pixKeyType": "TELEFONE",
      "pixKey": "5551999223232"
    };
    for (const requiredField of requiredFields){
      delete params[requiredField];
      await request(app)
        .post('/api/receivers')
        .send(params)
        .expect(400)
    }
  });

  test('Should return an error when email is not valid', async () => {
    await request(app)
      .post('/api/receivers')
      .send({
        "name": "Safira Erbes",
        "email": "serbes",
        "cpfOrCnpj": "92940093000152",
        "pixKeyType": "TELEFONE",
        "pixKey": "5551999223232"
      })
      .expect(400)
  });

  test('Should return an error when cpfOrCnpj is not valid', async () => {
    await request(app)
      .post('/api/receivers')
      .send({
        "name": "Safira Erbes",
        "email": "serbes@gmail.com",
        "cpfOrCnpj": "9294009300015",
        "pixKeyType": "TELEFONE",
        "pixKey": "5551999223232"
      })
      .expect(400)
  });

  test('Should return an error when pixKeyType is not valid', async () => {
    await request(app)
      .post('/api/receivers')
      .send({
        "name": "Safira Erbes",
        "email": "serbes@gmail.com",
        "cpfOrCnpj": "92940093000152",
        "pixKeyType": "some_type",
        "pixKey": "5551999223232"
      })
      .expect(400)
  });

  test('Should return an error when pixKey is not valid according to pixKeyType', async () => {
    await request(app)
      .post('/api/receivers')
      .send({
        "name": "Safira Erbes",
        "email": "serbes@gmail.com",
        "cpfOrCnpj": "92940093000152",
        "pixKeyType": "TELEFONE",
        "pixKey": "123e4567-e89b-12d3-a456-426614174001"
      })
      .expect(400)
  });

  test('Should return an error when pixKey is not valid according to pixKeyType', async () => {
    await request(app)
      .post('/api/receivers')
      .send({
        "name": "Safira Erbes",
        "email": "serbes@gmail.com",
        "cpfOrCnpj": "92940093000152",
        "pixKeyType": "TELEFONE",
        "pixKey": "123e4567-e89b-12d3-a456-426614174001"
      })
      .expect(400)
  });
});

describe('Delete receiver route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    const accountCollection = await MongoHelper.getCollection('receivers');
    await accountCollection.deleteMany({});
    await MongoHelper.disconnect();
  });

  test('Should return deleted receivers count on success', async () => {
    await request(app)
      .delete('/api/receivers')
      .send({ids: ["664011bb3ba8d50acd8cd1af"]})
      .expect(200)
  });

  test('Should return an error when ids is forgotten', async () => {
    await request(app)
      .delete('/api/receivers')
      .send({someField: [1, 2]})
      .expect(400)
  });

  test('Should return an error when ids is not an string list', async () => {
    await request(app)
      .delete('/api/receivers')
      .send({ids: [1, 2]})
      .expect(400)
  });
});

describe('Edit receiver route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    const accountCollection = await MongoHelper.getCollection('receivers');
    await accountCollection.deleteMany({});
    await MongoHelper.disconnect();
  });

  test('Should return edited receiver on success', async () => {
    const receiver = await request(app)
      .post('/api/receivers')
      .send({
        "name": "Safira Erbes",
        "email": "serbes@gmail.com",
        "cpfOrCnpj": "92940093000152",
        "pixKeyType": "TELEFONE",
        "pixKey": "5551999223232"
      });
      
    await request(app)
      .patch(`/api/receivers/${receiver.body.id}`)
      .send({email: "natan@gmail.com"})
      .expect(200);
  });

  test('Should return error when the provided id is not valid', async () => {
    await request(app)
      .patch("/api/receivers/some_id")
      .send({name: "Natan"})
      .expect(400);
  });

  test('Should return error when the provided email is not valid', async () => {
    const receiver = await request(app)
      .post("/api/receivers")
      .send({
        "name": "Safira Erbes",
        "email": "serbes@gmail.com",
        "cpfOrCnpj": "92940093000152",
        "pixKeyType": "TELEFONE",
        "pixKey": "5551999223232"
      });
      
    await request(app)
      .patch(`/api/receivers/${receiver.body.id}`)
      .send({email: "Natan"})
      .expect(400);
  });

  test('Should return error when the provided cpfOrCnpj is not valid', async () => {
    const receiver = await request(app)
      .post("/api/receivers")
      .send({
        "name": "Safira Erbes",
        "email": "serbes@gmail.com",
        "cpfOrCnpj": "92940093000152",
        "pixKeyType": "TELEFONE",
        "pixKey": "5551999223232"
      });
      
    await request(app)
      .patch(`/api/receivers/${receiver.body.id}`)
      .send({cpfOrCnpj: "9294009300015"})
      .expect(400);
  });

  test('Should return error when the pixKeyType is provided but the pixKey not', async () => {
    const receiver = await request(app)
      .post("/api/receivers")
      .send({
        "name": "Safira Erbes",
        "email": "serbes@gmail.com",
        "cpfOrCnpj": "92940093000152",
        "pixKeyType": "TELEFONE",
        "pixKey": "5551999223232"
      });
      
    await request(app)
      .patch(`/api/receivers/${receiver.body.id}`)
      .send({pixKeyType: "EMAIL"})
      .expect(400);
  });

  test('Should return error when the pixKey is not valid according to the pixKeyType', async () => {
    const receiver = await request(app)
      .post("/api/receivers")
      .send({
        "name": "Safira Erbes",
        "email": "serbes@gmail.com",
        "cpfOrCnpj": "92940093000152",
        "pixKeyType": "TELEFONE",
        "pixKey": "5551999223232"
      });
      
    await request(app)
      .patch(`/api/receivers/${receiver.body.id}`)
      .send({pixKeyType: "EMAIL", pixKey: "92940093000152"})
      .expect(400);
  });
});

describe('List receiver route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    const accountCollection = await MongoHelper.getCollection('receivers');
    await accountCollection.deleteMany({});
    await MongoHelper.disconnect();
  });

  test('Should return deleted receivers count on success', async () => {
    await request(app)
      .get('/api/receivers')
      .send({page: 1, filters:{name: "test", status: "RASCUNHO", pixKeyType: "CNPJ"}})
      .expect(200)
  });
});