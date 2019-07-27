const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://dev:Password1@cluster001-i6loe.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });



export default class UserController {


    static createAccount(req, res, next) {
        client.connect(err => {
            if (err) {
                console.log(err);
                client.close();
                res.status(404).send(
                    {
                        status: false,
                        message: 'error occurred creating account',
                        data: err
                    });
            }
            const col = client.db("test").collection("devices");
            // perform actions on the collection object
            col.insertOne(req.body).then((result) => {
                client.close();
                res.status(201).send(
                    {
                        status: true,
                        message: 'successfully created account',
                        data: result.insertedId
                    });
            });
            createAccount
        });
    }



    static login(req, res, next) {
        client.connect(err => {
            if (err) {
                console.log(err);
                return res.status(404).send(
                    {
                        status: false,
                        message: 'error occurred creating account',
                        data: err
                    });
            }
            const col = client.db("KW-FABGEP").collection("users");
            // perform actions on the collection object
            col.insertOne(req.body).then((result) => {
                client.close();
                res.status(200).send(
                    {
                        status: true,
                        message: 'successfully created account',
                        data: result.insertedId
                    });
            });

        });
    }





}
