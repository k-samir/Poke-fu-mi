"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
var bcrypt = require('bcrypt');
const saltRounds = 10;
const server = app_1.app.listen(5000, '0.0.0.0', () => {
    const { port, address } = server.address();
    console.log('Server listening on:', 'http://' + address + ':' + port);
});
//# sourceMappingURL=index.js.map