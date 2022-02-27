<img align="left" width="80" height="80" src="https://cdn.pixabay.com/photo/2019/11/27/14/06/pokemon-4657023_960_720.png">

# Poke-fu-mi

## Présentation
Bienvenue sur le git du projet Poke-fu-mi !
Poke-fu-mi est une application qui permet d'organiser des combats entre maîtres Pokémon mais les règles ne sont pas exactement celles du jeu classique.

[Documentation du projet](https://docs.google.com/document/d/1TNad6-f3UBtUEcqrL9srWEiu5bKGEF6GD9Wl_2qRz00/edit#) : Contiens le schéma de l'architecture, les descriptions des microservices et des instructions pour tester avec Postman.
<br> <br> 
[Lien Postman](https://www.postman.com/avionics-operator-61205825/workspace/poke-fu-mi/)


### Lancer l'application

> ~~~csh
> $ git clone https://github.com/k-samir/Poke-fu-mi.git
> ~~~
> ~~~csh
> $ cd ./Poke-fu-mi
> ~~~
> ~~~csh
> $ docker compose build
> ~~~
> ~~~csh
> $ docker compose up
> ~~~

## Documentation
-   localhost:5001/api-docs : Match
-   localhost:5002/api-docs : Auth
-   localhost:5003/api-docs : User  
## Schéma de l'application
<p align="center">
<img src="https://github.com/k-samir/Poke-fu-mi/blob/develop/documentation/image/Poke-fu-miArchitecture.png?raw=true">
 </p>
 
## MCD
<p align="center">
<img src="https://github.com/k-samir/Poke-fu-mi/blob/develop/documentation/image/mcd.png?raw=true">
 </p>

## JWT
Le microservice Auth gère l’échange sécurisé de jetons JWT entre microservice afin de limiter certaines actions uniquement destinées aux personnes connectés ou uniquement aux admins.
<p align="center">
<img src="https://github.com/k-samir/Poke-fu-mi/blob/develop/documentation/image/CustomJWT.png?raw=true">
 </p>
 
 
### Avancement du projet final

En tant que joueur, je peux …
- [x] m'inscrire à la plateforme avec un nom d'utilisateur unique.
- [x] me connecter à la plateforme utilisant mon nom d’utilisateur et un mot de passe
- [x] voir la liste de joueurs (avec leur score)
- [x] voir la liste de matchs
- [x] voir les détails d’un match: joueurs, Pokémons utilisés, etc
- [x] inviter un autre joueur à un match (creer un match)
- [x] consulter les invitations reçues
- [x] accepter une invitation à un match (joindre un match existant)
- [ ] créer un deck pour un match
- [ ] envoyer un Pokémon à l’arena et consulter le résultat du combat

En tant qu’administrateur, je peux …
- [x] me connecter à la plateforme utilisant mon nom d’utilisateur et un mot de passe
- [x] voir la liste de joueurs 
- [x] voir la liste de matchs
- [ ] effacer et modifier les joueurs et les matchs
- [ ] consulter les statistiques de la plateforme : nombre de matchs par jour, nombre de matchs par pokemon, nombre de victoires par pokemon, etc

## Technologies utilisés

**IDE :** Visual Studio Code <br>
**Language :** Typescript 4.5.4<br>
**Framework API:** Express 4.17.2<br>
**Librairie BD :** better-sqlite3 7.5.0<br>
**Environnement d’exécution :** Node.js 16.13.2<br>
**Gestionnaire de paquets :** npm 8.3.1<br>

## Authors
- [Samir KAMAR](https://github.com/k-samir)
- [Jérémy Pouzargues](https://github.com/jeremy-pouzargues)
