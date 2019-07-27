'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransactionModel = exports.TransactionModel = function TransactionModel() {
    _classCallCheck(this, TransactionModel);

    this.id = '';
    this.title = '';
    this.desc = '';
    this.type = ''; //debit or credit
    this.from = 0;
    this.to = 0;
    this.amount = 0;
    this.status = 'pending';
    this.timestamp = Date.now();
};