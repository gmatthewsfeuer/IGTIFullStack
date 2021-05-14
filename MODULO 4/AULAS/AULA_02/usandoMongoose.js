import dotenv from 'dotenv';

dotenv.config();

import mongoose from 'mongoose';

const { MONGODB_CONNECTION_PASSWORD, MONGODB_CONNECTION_USER } = process.env;

const databaseName = 'students';

const uri = `mongodb+srv://${MONGODB_CONNECTION_USER}:${MONGODB_CONNECTION_PASSWORD}@bootcamp.gdeuf.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

// Conectar ao MongoDB pelo Mongoose
(async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
    });
    
    console.log('Conectado com sucesso ao MongoDB Atlas!');
	} catch (err) {
		console.log(`Houve um problema ao conectar ao MongoDB Atlas! \n${err}`);
	}
})();

// Criação do modelo da coleção:
const listingsSchema = mongoose.Schema({
	name: { type: String, require: true },
	property_type: { type: String, require: true },
	last_review: { type: Date, default: Date.now },
});

// Definindo o modelo da coleção:
mongoose.model('listingsAndReviews', listingsSchema);

const listingsAndReviews = mongoose.model('listingsAndReviews');

// Inserindo documentos:
new listingsAndReviews({
	name: 'Gustavo',
	property_type: 'House',
})
	.save()
	.then(console.log('Documento Inserido!'))
	.catch((err) => console.log(err));
