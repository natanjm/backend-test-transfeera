
const { MongoHelper } = require("../infra/db/mongo/helpers/mongo-helper");

const items = [
  {
    "pixKeyType": "CPF",
    "pixKey": "73645678901",
    "email": "alice@example.com",
    "name": "Alice Smith",
    "cpfOrCnpj": "73645678901",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "CNPJ",
    "pixKey": "56478912345678",
    "email": "bob@example.com",
    "name": "Bob Johnson",
    "cpfOrCnpj": "56478912345678",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "EMAIL",
    "pixKey": "charlie@example.com",
    "email": "charlie@example.com",
    "name": "Charlie Brown",
    "cpfOrCnpj": "12345678901",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "TELEFONE",
    "pixKey": "+5511987654321",
    "email": "david@example.com",
    "name": "David Davis",
    "cpfOrCnpj": "12345678901",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "CHAVE_ALEATORIA",
    "pixKey": "123e4567-e89b-12d3-a456-426614174001",
    "email": "emma@example.com",
    "name": "Emma White",
    "cpfOrCnpj": "12345678901",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "CPF",
    "pixKey": "12345678901",
    "email": "frank@example.com",
    "name": "Frank Miller",
    "cpfOrCnpj": "12345678901",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "CNPJ",
    "pixKey": "98765432109876",
    "email": "grace@example.com",
    "name": "Grace Taylor",
    "cpfOrCnpj": "98765432109876",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "EMAIL",
    "pixKey": "henry@example.com",
    "email": "henry@example.com",
    "name": "Henry Clark",
    "cpfOrCnpj": "98765432109876",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "TELEFONE",
    "pixKey": "+5511887654321",
    "email": "isabella@example.com",
    "name": "Isabella Wright",
    "cpfOrCnpj": "98765432109876",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "CHAVE_ALEATORIA",
    "pixKey": "321e4567-e89b-12d3-a456-426614174009",
    "email": "jack@example.com",
    "name": "Jack Green",
    "cpfOrCnpj": "98765432109876",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "CPF",
    "pixKey": "56789012345",
    "email": "jane@example.com",
    "name": "Jane Brown",
    "cpfOrCnpj": "56789012345",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "CNPJ",
    "pixKey": "45678912345678",
    "email": "kate@example.com",
    "name": "Kate Wilson",
    "cpfOrCnpj": "45678912345678",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "EMAIL",
    "pixKey": "leo@example.com",
    "email": "leo@example.com",
    "name": "Leo Martinez",
    "cpfOrCnpj": "45678912345678",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "TELEFONE",
    "pixKey": "+5511765432109",
    "email": "mia@example.com",
    "name": "Mia Martinez",
    "cpfOrCnpj": "45678912345678",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "CHAVE_ALEATORIA",
    "pixKey": "456e4567-e89b-12d3-a456-426614174009",
    "email": "noah@example.com",
    "name": "Noah Brown",
    "cpfOrCnpj": "45678912345678",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "CPF",
    "pixKey": "32109876543",
    "email": "olivia@example.com",
    "name": "Olivia Johnson",
    "cpfOrCnpj": "32109876543",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "CNPJ",
    "pixKey": "32165498745632",
    "email": "peter@example.com",
    "name": "Peter Brown",
    "cpfOrCnpj": "32165498745632",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "EMAIL",
    "pixKey": "quinn@example.com",
    "email": "quinn@example.com",
    "name": "Quinn Davis",
    "cpfOrCnpj": "32165498745632",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "TELEFONE",
    "pixKey": "+5511387654321",
    "email": "rose@example.com",
    "name": "Rose Wilson",
    "cpfOrCnpj": "32165498745632",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "CHAVE_ALEATORIA",
    "pixKey": "123e4567-e89b-12d3-a456-426614174005",
    "email": "sophia@example.com",
    "name": "Sophia Taylor",
    "cpfOrCnpj": "32165498745632",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "CPF",
    "pixKey": "12345678901",
    "email": "example1@test.com",
    "name": "John Doe",
    "cpfOrCnpj": "12345678901",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "CNPJ",
    "pixKey": "12345678901234",
    "email": "example2@test.com",
    "name": "Jane Smith",
    "cpfOrCnpj": "12345678901234",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "EMAIL",
    "pixKey": "example3@test.com",
    "email": "example3@test.com",
    "name": "Alice Johnson",
    "cpfOrCnpj": "34567890123",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "TELEFONE",
    "pixKey": "+5512345678901",
    "email": "example4@test.com",
    "name": "Michael Brown",
    "cpfOrCnpj": "56789012345",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "CHAVE_ALEATORIA",
    "pixKey": "123e4567-e89b-12d3-a456-426614174001",
    "email": "example5@test.com",
    "name": "Emma White",
    "cpfOrCnpj": "67890123456",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "CPF",
    "pixKey": "98765432109",
    "email": "example6@test.com",
    "name": "Robert Johnson",
    "cpfOrCnpj": "98765432109",
    "status": "RASCUNHO",
  },
  {
    "pixKeyType": "CNPJ",
    "pixKey": "34567890123456",
    "email": "example7@test.com",
    "name": "David Taylor",
    "cpfOrCnpj": "34567890123456",
    "status": "VALIDADO",
  },
  {
    "pixKeyType": "CPF",
    "pixKey": "23456789012",
    "email": "frank@example.com",
    "name": "Frank Wilson",
    "cpfOrCnpj": "23456789012",
    "status": "RASCUNHO"
  },
  {
    "pixKeyType": "TELEFONE",
    "pixKey": "+5511987654321",
    "email": "david@example.com",
    "name": "David Brown",
    "cpfOrCnpj": "12345678901",
    "status": "RASCUNHO"
  },
  {
    "pixKeyType": "CHAVE_ALEATORIA",
    "pixKey": "123e4567-e89b-12d3-a456-426614174001",
    "email": "emma@example.com",
    "name": "Emma Johnson",
    "cpfOrCnpj": "12345678901",
    "status": "VALIDADO"
  },
]

type input = {
  "pixKeyType": string;
  "pixKey": string;
  "email": string;
  "name": string;
  "cpfOrCnpj": string;
  "status": string;
}

const insertItems = async (items: input[]): Promise<void> => {
  MongoHelper.connect("mongodb://mongo:mongo@localhost:27017/clean-node-api?authSource=admin")
  .then(async () => {
    const receiversCollection = await MongoHelper.getCollection('receivers');
    for (const item of items){
      const data = Object.assign({}, item, {
        insertedAt: new Date(),
        updatedAt: new Date()
      })
      await receiversCollection.insertOne(data);
    }
    MongoHelper.disconnect();
  })
  .catch(console.error)
}

insertItems(items);
