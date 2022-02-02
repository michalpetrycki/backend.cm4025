import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

export const collections: { users?: mongoDB.Collection } = {}

export async function connectToDatabase(){

    dotenv.config();

    console.log('dotenv');

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING_LOCAL!);

    console.log('client');

    await client.connect();

    console.log('connect');

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    // ! says to typescript that even if something might look like null it definitely is not a null
    const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION!);

    collections.users = usersCollection;

    console.log(`Successfully connected to database ${db.databaseName} and collection: ${usersCollection.collectionName}`);

}