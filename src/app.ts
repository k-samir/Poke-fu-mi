import express, {Application, Request,Response} from 'express';
import {User} from './models/user';

const app = express();
const port = 5000;

let users = {};
  
app.get('/',(req:Request,res:Response)=>{
    res.send('Hello world');
});

app.get('/users', (req:Request,res:Response) => {
    res.send(users);
});

// POST method route
app.post('/register', function (req, res) {
    res.send(req.body);
});



app.listen(port,() => {
    console.log('Connected successfully on port '  + port)
});

