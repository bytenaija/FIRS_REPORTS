exports.id = "main";
exports.modules = {

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var oracledb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! oracledb */ \"oracledb\");\n/* harmony import */ var oracledb__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(oracledb__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _dbConfig__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dbConfig */ \"./server/dbConfig.js\");\n/* harmony import */ var _dbConfig__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_dbConfig__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _src_App__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/App */ \"./src/App.js\");\nvar _jsxFileName = \"C:\\\\Users\\\\T540P\\\\Desktop\\\\projects\\\\2019\\\\firs_report\\\\v-report\\\\server\\\\index.js\";\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\n\n\n\n\n\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\noracledb__WEBPACK_IMPORTED_MODULE_2___default.a.outFormat = oracledb__WEBPACK_IMPORTED_MODULE_2___default.a.OBJECT;\nvar PORT = process.env.PORT || 3008;\nvar app = express__WEBPACK_IMPORTED_MODULE_4___default()();\nvar NODE_ENV = \"development\";\n\nif (NODE_ENV === 'production') {\n  app.use(express__WEBPACK_IMPORTED_MODULE_4___default.a.static(\"./client\"));\n  app.get(\"/*\", function (req, res) {\n    var app = react_dom_server__WEBPACK_IMPORTED_MODULE_5___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_src_App__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 23\n      }\n    }));\n    var indexFile = path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(\"./client/index.html\");\n    fs__WEBPACK_IMPORTED_MODULE_1___default.a.readFile(indexFile, \"utf8\", function (err, data) {\n      if (err) {\n        console.error(\"Something went wrong:\", err);\n        return res.status(500).send(\"Oops, better luck next time!\");\n      }\n\n      return res.send(data.replace('<div id=\"root\"></div>', \"<div id=\\\"root\\\">\".concat(app, \"</div>\")));\n    });\n  });\n} else {\n  app.use(express__WEBPACK_IMPORTED_MODULE_4___default.a.static(\"./build\"));\n  app.get(\"/*\", function (req, res) {\n    var app = react_dom_server__WEBPACK_IMPORTED_MODULE_5___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_src_App__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 41\n      }\n    }));\n    var indexFile = path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(\"./build/index.html\");\n    fs__WEBPACK_IMPORTED_MODULE_1___default.a.readFile(indexFile, \"utf8\", function (err, data) {\n      if (err) {\n        console.error(\"Something went wrong:\", err);\n        return res.status(500).send(\"Oops, better luck next time!\");\n      }\n\n      return res.send(data.replace('<div id=\"root\"></div>', \"<div id=\\\"root\\\">\".concat(app, \"</div>\")));\n    });\n  });\n}\n\napp.get(\"/api\", function (req, res) {\n  try {\n    console.log(_dbConfig__WEBPACK_IMPORTED_MODULE_6___default.a);\n    oracledb__WEBPACK_IMPORTED_MODULE_2___default.a.getConnection({\n      user: _dbConfig__WEBPACK_IMPORTED_MODULE_6___default.a.user,\n      password: _dbConfig__WEBPACK_IMPORTED_MODULE_6___default.a.password,\n      connectString: _dbConfig__WEBPACK_IMPORTED_MODULE_6___default.a.connectString\n    }).then(\n    /*#__PURE__*/\n    function () {\n      var _ref = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(conn) {\n        var currentYearContractSumQuery, currentYearSpendAreasQuery, contractAwardedForYearsQuery, currentYearContractSum, currentYearSpendAreas, liabilitiesInSpendAreas, fecAwardedProjectsCurrentLiabilities, contractAwardedForYears, yearsContractSumVariousSpend;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                console.log(conn);\n                currentYearContractSumQuery = 'select contractSubType, count(contractSubType) from reports_vendor group by contractSubType';\n                currentYearSpendAreasQuery = 'select contractSubType, paymentType, count(contractSubType) from reports_vendor group by contractSubType group by paymentType';\n                contractAwardedForYearsQuery = 'select contractSubType, trunc(requestDate, \"Year\") from reports_vendor group by contractSubType group by trunc(requestDate, \"Year\")';\n                _context.next = 6;\n                return conn.execute(currentYearContractSumQuery);\n\n              case 6:\n                currentYearContractSum = _context.sent;\n                _context.next = 9;\n                return conn.execute(currentYearSpendAreasQuery);\n\n              case 9:\n                currentYearSpendAreas = _context.sent;\n                liabilitiesInSpendAreas = [];\n                fecAwardedProjectsCurrentLiabilities = [];\n                _context.next = 14;\n                return conn.execute(contractAwardedForYearsQuery);\n\n              case 14:\n                contractAwardedForYears = _context.sent;\n                yearsContractSumVariousSpend = [];\n                res.json({\n                  currentYearContractSum: currentYearContractSum,\n                  currentYearSpendAreas: currentYearSpendAreas,\n                  liabilitiesInSpendAreas: liabilitiesInSpendAreas,\n                  fecAwardedProjectsCurrentLiabilities: fecAwardedProjectsCurrentLiabilities,\n                  contractAwardedForYears: contractAwardedForYears,\n                  yearsContractSumVariousSpend: yearsContractSumVariousSpend\n                });\n\n              case 17:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }));\n\n      return function (_x) {\n        return _ref.apply(this, arguments);\n      };\n    }()).catch(function (err) {\n      console.log(err);\n      res.status(500).json({\n        err: err\n      });\n    });\n  } catch (err) {\n    console.log(err);\n  }\n});\napp.listen(PORT, function () {\n  console.log(\"\\uD83D\\uDE0E Server is listening on port \".concat(PORT));\n});\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ })

};