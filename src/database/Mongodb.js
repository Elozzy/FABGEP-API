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
    static async findOne(collection, query, callBack) {
        const c = await MDBConnect.connect(collection);
        await c.findOne(query, callBack);


    }
    static async insert(collection, query) {
        const c = await MDBConnect.connect(collection);
        const result = await c.insertOne(query);
        return result;
    }
}
export default MDBConnect;