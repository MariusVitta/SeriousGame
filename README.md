# SeriousGame

Serious game de gestion de projet basé sur la méthode SCRUM.

## Vue d'ensemble

Ce projet contient un parcours de quiz en JavaScript, avec plusieurs niveaux (calcul, QCM, compréhension, aide à domicile) et un moteur partagé pour la logique commune.

## Organisation du projet

- `quiz/index.html` : page d'accueil du parcours
- `quiz/html/` : pages HTML de niveaux et écrans de jeu
- `quiz/css/` : styles du projet
- `quiz/js/core/` : logique commune en modules ES6 (`cookie-storage.js`, `quiz-engine.js`)
- `quiz/js/data/` : données de quiz et contenus de questions
- `quiz/js/games/` : points d'entrée des jeux, plus lisibles et découplés
- `quiz/js/*.js` : scripts legacy encore conservés pour compatibilité
- `quiz/js/script-score.js` : lecture et synthèse des scores
- `quiz/tests/` : tests de régression JavaScript

## Architecture

Le cœur du projet a été refactoré pour éviter la duplication entre les jeux, sans introduire de framework :

- modules ES6 pour la logique commune
- dossiers par responsabilité : `core`, `data`, `games`
- service unique pour le stockage des cookies
- moteur de quiz partagé pour le rendu et la progression
- validation plus robuste des interactions utilisateur

Cette organisation garde le projet léger tout en rendant le code plus lisible et extensible si le volume augmente.

## Règles de fonctionnement

- Les jeux utilisent un compteur de progression visible : `Question X sur Y • N questions restantes`
- Le champ de saisie est réinitialisé entre chaque question
- La touche Entrée ne recharge plus la page : elle déclenche la validation via le formulaire
- La fin de partie est gérée proprement à la dernière question

## Tests

Le projet inclut désormais des tests Node pour couvrir les régressions majeures :

- stockage des scores dans les cookies
- progression du quiz
- fin de partie
- réinitialisation du champ de réponse
- validation par clavier et bouton

Commande de validation :

```bash
cd quiz
node --test --test-reporter=spec
```

## Points d'amélioration futurs

- extraire les questions dans des fichiers de données dédiés
- uniformiser davantage les jeux legacy et le noyau partagé
- migrer vers une architecture plus moderne si le projet grandit
