import { User } from "../model/User"
import UserRepository from "./userRepository"

const userRepository = new UserRepository()

const listUsers = () => {
    return userRepository.getAllUsers() 
}

const addUser = (newUser: User) => {
  userRepository.createUser(newUser.name,newUser.password)
  return userRepository.getAllUsers()
}

const login = async (newUser: User) => {
  return await userRepository.login(newUser.name,newUser.password) 
}

const clearDB = () => {
  return userRepository.clearDB() 
}

export { listUsers, addUser,login, clearDB }

