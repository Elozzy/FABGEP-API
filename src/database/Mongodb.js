import { MongoClient } from 'mongodb';
const CONNECTION_URL = "mongodb+srv://dev:Password1@cluster001-i6loe.mongodb.net/test?retryWrites=true&w=majority";
const db = 'KW-FABGEP';

class MDBConnect {
    static async connect(collection) {
        try {
            const client = await MongoClient.connect(CONNECTION_URL);
            return client.db(db).collection(collection);
        }
        catch (err) {
            console.log(err);
        }
    }
    static async findOne(collection, keyPair, ) {
        try {
            const c = await MDBConnect.connect(collection);
            const result = await c.findOne(keyPair);
            return result;
        } catch (error) {
            return error;
        }

    }
    static async insertOne(collection, query) {
        const c = await MDBConnect.connect(collection);
        const result = await c.insertOne(query);
        return result;
    }
    static async insertMany(collection, query) {
        const c = await MDBConnect.connect(collection);
        const result = await c.insertMany(query);
        return result;
    }
    static async updateOne(collection, keyPair, update) {
        const c = await MDBConnect.connect(collection);
        const result = await c.updateOne(keyPair, { $set: update });
        return result;
    }
    static async findOneAndReplace(collection, keyPair, modification) {
        const c = await MDBConnect.connect(collection);
        const result = await c.findOneAndReplace(keyPair, modification, { returnNewDocument: true, maxTimeMS: 10 });
        return result;
    }
}
export default MDBConnect;