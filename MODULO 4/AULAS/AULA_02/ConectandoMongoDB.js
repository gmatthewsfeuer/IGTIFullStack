import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_CONNECTION_PASSWORD, MONGODB_CONNECTION_USER } = process.env;

const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${MONGODB_CONNECTION_USER}:${MONGODB_CONNECTION_PASSWORD}@bootcamp.gdeuf.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.connect(async (err) => {

  //Obter coleção 'listingsAndReviews' no banco 'sample_airbnb'.
  const collection = client.db('sample_airbnb').collection('listingsAndReviews');

  // Buscando documentos cujo name seja "Ribeira Charming Duplex".
  // const documents = await collection.find({ name: "Ribeira Charming Duplex" }).toArray();
  // console.log(documents);

  // Obter lista dos Bancos de Dados no servidor conectado.
  const databaseList = await client.db().admin().listDatabases();

  console.log(`Databases:`);

  databaseList.databases.forEach(db => console.log(` – ${db.name}`));

	client.close();
});
