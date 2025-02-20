# 🃏 Projet Blackjack API - NestJS  

## 📌 Description  
Ce projet est une API REST développée avec **NestJS** qui permet de jouer à une version simplifiée du Blackjack.  
Elle utilise l’API [Deck of Cards](https://deckofcardsapi.com/) pour gérer les cartes et les jeux.  

---

## 🚀 Installation et Démarrage  

### 1️⃣ Prérequis  
Avant d’installer le projet, assure-toi d’avoir :  
- **Node.js** installé (`>= 16.x`)  
- **npm** ou **yarn** installé  

### 2️⃣ Installation du projet  
Clone le dépôt et installe les dépendances :  
```bash
git clone https://github.com/ton-repo/blackjack-api.git  
cd blackjack-api  
npm install  
```  

### 3️⃣ Lancer l’application  
Pour démarrer le serveur NestJS :  
```bash
npm run start  
```  
Par défaut, l’API est accessible à **`http://localhost:3000`**.  

---

## 📌 Endpoints de l’API  

### 🎮 1. Créer une nouvelle partie  
🔹 **POST** `/game`  
✅ **Description :** Initialise un nouveau jeu avec un paquet de cartes mélangé.  
📥 **Paramètres :** Aucun  
📤 **Réponse :**  
```json
{
  "gameId": "xyz123",
  "playerHand": [...],
  "playerScore": 10,
  "dealerHand": [...],
  "dealerScore": 5,
  "hiddenDealerCard": { ... },
  "status": "In Progress"
}
```

---

### 🃏 2. Piocher une carte  
🔹 **POST** `/game/:gameId/draw`  
✅ **Description :** Le joueur tire une nouvelle carte.  
📥 **Paramètre URL :**  
- `gameId` (string) → ID de la partie  
📤 **Réponse :** État du jeu mis à jour  

---

### ✋ 3. Stopper le jeu  
🔹 **POST** `/game/:gameId/stop`  
✅ **Description :** Le joueur termine son tour et le croupier joue.  
📥 **Paramètre URL :**  
- `gameId` (string) → ID de la partie  
📤 **Réponse :** État final de la partie avec la main complète du croupier et le statut (`Won`, `Lost`, `Draw`).  

---

### 📊 4. Consulter l’état du jeu  
🔹 **GET** `/game/:gameId`  
✅ **Description :** Récupère l’état actuel d’une partie.  
📥 **Paramètre URL :**  
- `gameId` (string) → ID de la partie  
📤 **Réponse :** Données du jeu  

---

## 🛠️ Architecture et Explication du Code  
Le projet est structuré en plusieurs fichiers clés :  
📁 `src/`  
├── 📄 `game.module.ts` → Définit le module `GameModule`  
├── 📄 `game.controller.ts` → Gère les routes de l’API  
├── 📄 `game.service.ts` → Contient la logique métier du jeu  
├── 📄 `main.ts` → Fichier principal qui démarre l’application  

### 📌 Détails du code  
✅ **Utilisation de `@Controller`, `@Get`, `@Post`, `@Param` pour définir les routes.**  
✅ **Injection de dépendance avec `GameService` pour la logique métier.**  
✅ **Utilisation de `HttpService` pour interagir avec l’API des cartes.**  
✅ **Gestion du score avec un système dynamique pour l’As (11 ou 1).**  
✅ **Vérification des conditions de victoire (Blackjack, Bust, etc.).**  

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
