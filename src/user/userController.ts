import { User } from "../model/User"
import UserRepository from "./userRepository"


const typedUsers: User[] = []
const userRepository = new UserRepository()


const listUsers = () => {
  return userRepository.getAllUsers()
}

const addUser = (newUser: User) => {
  userRepository.createUser(newUser.name)
  return userRepository.getAllUsers()
}


export { listUsers, addUser }
