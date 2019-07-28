import { MongoClient } from 'mongodb';
const CONNECTION_URL = "mongodb+srv://foodmoni:B9aCRPAHQf5T1sjZ@cluster0-ax5bs.mongodb.net/test?retryWrites=true&w=majority";
const db = 'foodmoni';

class MDBConnect {
    static async connect (collection) {
        try {
            const client = await MongoClient.connect(CONNECTION_URL);
            return client.db('foodmoni').collection(collection);
        }
        catch (err) {
            console.log(err);
        }
    }
    static async findOne(collection, query) {
        const c = await MDBConnect.connect('foodmoni', collection);
        const result = await c.findOne(query);
        return result;
    }
    static async insert(collection, query) {
        const c = await MDBConnect.connect(collection);
        const result = await c.insertOne(query);
        return result;
    }
}
export default MDBConnect;