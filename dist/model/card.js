'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CARD = exports.CARD = function CARD() {
    _classCallCheck(this, CARD);

    this.id = '';
    this.owner = '';
    this.number = 0;
    this.mm = 0;
    this.yy = 0;
    this.cvv = 0;
    this.name = 0;
    this.timestamp = Date.now();
};