import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

let database = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);
try {
    await mongoClient.connect();
    database = mongoClient.db(process.env.BANCO);
    console.log(chalk.blue.bold("Conexão com o banco dados estabelecida!"));
} catch (e){
    console.log(chalk.red.bold('Erro na conexão com banco de dados'));
}

export default database;