exports.id = "main";
exports.modules = {

/***/ "./server/dbConfig.js":
/*!****************************!*\
  !*** ./server/dbConfig.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  user: process.env.NODE_ORACLEDB_USER || \"sysdba\",\n  // Instead of hard coding the password, consider prompting for it,\n  // passing it in an environment variable via process.env, or using\n  // External Authentication.\n  password: process.env.NODE_ORACLEDB_PASSWORD || 'welcome1',\n  // For information on connection strings see:\n  // https://oracle.github.io/node-oracledb/doc/api.html#connectionstrings\n  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || \"REVENUE\",\n  // Setting externalAuth is optional.  It defaults to false.  See:\n  // https://oracle.github.io/node-oracledb/doc/api.html#extauth\n  externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH = false\n};\n\n//# sourceURL=webpack:///./server/dbConfig.js?");

/***/ })

};