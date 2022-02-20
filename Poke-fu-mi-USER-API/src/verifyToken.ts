import got from 'got';

module.exports = function (req: any,res: any,next: () => void){
    got.get('http://localhost:5001/verify').then(response => response.body)
    next();   
}

