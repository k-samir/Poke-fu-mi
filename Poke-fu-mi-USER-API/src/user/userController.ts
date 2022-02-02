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

const login = (newUser: User) => {
  return userRepository.login(newUser.name,newUser.password) 
}

export { listUsers, addUser,login }
