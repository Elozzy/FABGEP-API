"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongoClient = require("mongodb").MongoClient;

var uri = "mongodb+srv://dev:Password@1@cluster001-i6loe.mongodb.net/test?retryWrites=true&w=majority";

var client = new MongoClient(uri, { useNewUrlParser: true });

var UserController = function () {
    function UserController() {
        _classCallCheck(this, UserController);
    }

    _createClass(UserController, null, [{
        key: "createAccount",
        value: function (_createAccount) {
            function createAccount(_x, _x2) {
                return _createAccount.apply(this, arguments);
            }

            createAccount.toString = function () {
                return _createAccount.toString();
            };

            return createAccount;
        }(function (req, res) {
            client.connect(function (err) {
                if (err) {
                    console.log(err);
                    client.close();
                    res.status(404).send({
                        status: false,
                        message: 'error occurred creating account',
                        data: err
                    });
                }
                var col = client.db("test").collection("devices");
                // perform actions on the collection object
                col.insertOne(req.body).then(function (result) {
                    client.close();
                    res.status(201).send({
                        status: true,
                        message: 'successfully created account',
                        data: result.insertedId
                    });
                });
                createAccount;
            });
        })
    }]);

    return UserController;
}();

module.export = UserController;