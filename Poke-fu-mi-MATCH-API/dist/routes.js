"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
var request = require('request');
const register = (app) => {
    app.get('/', (req, res) => res.send('Hello World!'));
    app.get('/pokemon', (req, res) => {
        var url = 'https://pokeapi.co/api/v2/pokemon/';
        req.pipe(request(url)).pipe(res);
    });
};
exports.register = register;
//# sourceMappingURL=routes.js.map