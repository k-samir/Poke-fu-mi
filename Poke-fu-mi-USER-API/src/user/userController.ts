import { Invitation } from "../model/Invitation"
import { User } from "../model/User"
import UserRepository from "./userRepository"
import got from 'got';

const userRepository = new UserRepository()

const listUsers = () => {
    return userRepository.getAllUsers() 
}

const addUser = (newUser: User) => {
  userRepository.createUser(newUser.name,newUser.password)
 
  return newUser.name + " account succesfuly created";
}

const userInDb = (id:number) => {
  return userRepository.idUsed(id);
}


const login = async (newUser: User) => {
  return await userRepository.login(newUser.name,newUser.password) 
}




const clearDB = () => {
  return userRepository.clearDB() 
}

export { listUsers, addUser,login, clearDB ,userInDb}

