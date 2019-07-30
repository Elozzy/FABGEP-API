"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _Mongodb = _interopRequireDefault(require("../database/Mongodb"));

var _fs = _interopRequireDefault(require("fs"));

var output = '/home/ik/APIs/Account-Number-Generator/account.json';

_fs["default"].readFile(output, 'utf8', function (err, data) {
  var raw = JSON.parse(data);
  console.log(raw);

  _Mongodb["default"].insert('index_account_number', raw);
});