const jwt = require('jsonwebtoken');

const accessTokenSecret = "youraccesstokensecret"

export const signJWT = (payload: any) => {
    return jwt.sign(payload, accessTokenSecret, {expiresIn:"1h"});
}


export const verifyJWT = (token: string) =>{
    return jwt.verify(token, accessTokenSecret);
}