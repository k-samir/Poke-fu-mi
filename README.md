<img align="left" width="80" height="80" src="https://cdn.pixabay.com/photo/2019/11/27/14/06/pokemon-4657023_960_720.png">

# Poke-fu-mi

## Overview
Welcome to the Git repository for the Poke-fu-mi project!  
Poke-fu-mi is an application designed to organize battles between Pokémon trainers, though the rules are not exactly the same as the classic game.

[Project Documentation](https://docs.google.com/document/d/1TNad6-f3UBtUEcqrL9srWEiu5bKGEF6GD9Wl_2qRz00/edit#): Contains the architecture schema, microservice descriptions, and instructions for testing with Postman.  

[Postman Link](https://www.postman.com/avionics-operator-61205825/workspace/poke-fu-mi/)

### Launching the Application

```bash
$ git clone https://github.com/k-samir/Poke-fu-mi.git
$ cd ./Poke-fu-mi
$ docker compose build
$ docker compose up
```

## Documentation
-   `localhost:5001/api-docs`: Match  
-   `localhost:5002/api-docs`: Auth  
-   `localhost:5003/api-docs`: User  

## Application Diagram
<p align="center">
<img src="https://github.com/k-samir/Poke-fu-mi/blob/master/documentation/image/Poke-fu-miArchitecture.png?raw=true">
 </p>

## MCD (Conceptual Data Model)
<p align="center">
<img src="https://github.com/k-samir/Poke-fu-mi/blob/master/documentation/image/mcd.png?raw=true">
 </p>

## JWT
The Auth microservice manages the secure exchange of JWT tokens between microservices to restrict certain actions to authenticated users or admins only.  
<p align="center">
<img src="https://github.com/k-samir/Poke-fu-mi/blob/master/documentation/image/CustomJWT.png?raw=true">
 </p>

### Final Project Progress

As a **player**, I can:  
- [x] Register on the platform with a unique username.  
- [x] Log in to the platform using my username and password.  
- [x] View the list of players (with their scores).  
- [x] View the list of matches.  
- [x] View the details of a match: players, Pokémon used, etc.  
- [x] Invite another player to a match (create a match).  
- [x] Check received invitations.  
- [x] Accept a match invitation (join an existing match).  
- [ ] Create a deck for a match.  
- [ ] Send a Pokémon to the arena and view the battle result.  

As an **administrator**, I can:  
- [x] Log in to the platform using my username and password.  
- [x] View the list of players.  
- [x] View the list of matches.  
- [ ] Delete and modify players and matches.  
- [ ] View platform statistics: matches per day, matches per Pokémon, wins per Pokémon, etc.  

## Technologies Used

**IDE:** Visual Studio Code  
**Language:** Typescript 4.5.4  
**API Framework:** Express 4.17.2  
**Database Library:** better-sqlite3 7.5.0  
**Runtime Environment:** Node.js 16.13.2  
**Package Manager:** npm 8.3.1  

## Authors
- [Samir KAMAR](https://github.com/k-samir)  
- [Jérémy Pouzargues](https://github.com/jeremy-pouzargues)  
