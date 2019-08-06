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

            console.log(err);
        }
    }
    static async findOne(collection, keyPair, ) {
        try {
            const c = await MDBConnect.connect(collection);
            const result = await c.findOne(keyPair);
            return result;
        } catch (error) {
            console.log(error);

            return error;
        }

    }
    static async findMany(collection, keyPair, limit) {
        try {
            const c = await MDBConnect.connect(collection);
            const result = await c.find(keyPair).limit(limit).toArray();
            return result;
        } catch (error) {
            console.log(error);

            return error;
        }

    }
    static async insertOne(collection, query) {
        try {
            const c = await MDBConnect.connect(collection);
            const result = await c.insertOne(query);
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }

    }
    static async insertMany(collection, query) {
        try {
            const c = await MDBConnect.connect(collection);
            const result = await c.insertMany(query);
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }

    }
    static async updateOne(collection, keyPair, update) {
        try {
            const c = await MDBConnect.connect(collection);
            const result = await c.updateOne(keyPair, { $set: update });
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }

    }
    static async findOneAndReplace(collection, keyPair, modification) {
        try {
            const c = await MDBConnect.connect(collection);
            const result = await c.findOneAndReplace(keyPair, modification, { returnNewDocument: true, maxTimeMS: 10 });
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }

    }
    static async deleteOne(collection, keyPair) {
        try {
            const c = await MDBConnect.connect(collection);
            const result = await c.deleteOne(keyPair);
            return result;
        } catch (error) {

        }

    }
    static async deleteMany(collection, keyPair) {
        try {
            const col = await MDBConnect.connect(collection);
            const result = await col.deleteMany(keyPair);
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
export default MDBConnect;