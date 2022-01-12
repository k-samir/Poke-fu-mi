"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
let users = {};
app.get('/', (req, res) => {
    res.send('Hello world');
});
app.get('/users', (req, res) => {
    res.send(users);
});
// POST method route
app.post('/register', function (req, res) {
    res.send(req.body);
});
app.listen(port, () => {
    console.log('Connected successfully on port ' + port);
});
