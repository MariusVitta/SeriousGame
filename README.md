# SeriousGame

Serious game de sensibilisation et de formation, centré sur des parcours de quiz en JavaScript.

## Vue d'ensemble

Le projet propose plusieurs parcours :

- calcul
- QCM
- compréhension
- aide à domicile

Les jeux partagent une logique commune pour gérer :

- la progression
- le rendu DOM
- le stockage des scores dans les cookies
- les comportements de validation et de fin de partie

Le projet est volontairement conservé simple, sans framework ni build, afin de rester compatible avec un usage local et statique.

## Structure du dépôt

```text
SeriousGame/
├─ README.md
├─ quiz/
│  ├─ index.html
│  ├─ score.html
│  ├─ niveau-calcul.html
│  ├─ niveau-qcm.html
│  ├─ niveau-comprehension.html
│  ├─ aide-domicile.html
│  ├─ css/
│  ├─ html/
│  │  ├─ calcul-niveau-1.html
│  │  ├─ calcul-niveau-2.html
│  │  ├─ calcul-niveau-3.html
│  │  ├─ qcm-niveau-1.html
│  │  ├─ qcm-niveau-2.html
│  │  ├─ qcm-niveau-3.html
│  │  ├─ comprehension-niveau-1.html
│  │  ├─ comprehension-niveau-2.html
│  │  └─ comprehension-niveau-3.html
│  ├─ js/
│  │  ├─ core/
│  │  │  ├─ quiz-core.js
│  │  │  ├─ quiz-engine.js
│  │  │  └─ cookie-storage.js
│  │  ├─ data/
│  │  │  └─ qcm-niveau-1.js
│  │  ├─ games/
│  │  │  ├─ calcul-niveau-1.js
│  │  │  └─ qcm-niveau-1.js
│  │  ├─ aide-domicile.js
│  │  ├─ calcul-niveau-2.js
│  │  ├─ calcul-niveau-3.js
│  │  ├─ comprehension-niveau-1.js
│  │  ├─ comprehension-niveau-2.js
│  │  ├─ comprehension-niveau-3.js
│  │  ├─ qcm-niveau-2.js
│  │  ├─ qcm-niveau-3.js
│  │  └─ script-score.js
│  └─ tests/
│     └─ quiz-regressions.test.js
└─ .gitignore
```

## Architecture

Le noyau partagé est centralisé dans `quiz/js/core/quiz-core.js`.

Il contient :

- `Question`
- `Quiz`
- `CookieStorage`
- `createQuizPage(...)`
- `createCalculationQuiz(...)`

Cette organisation permet de :

- éviter la duplication du code entre les jeux
- uniformiser la gestion des cookies et des scores
- garder une logique de rendu cohérente
- sécuriser les régressions avec un petit jeu de tests

## Règles de fonctionnement

Les jeux respectent un comportement homogène :

- le compteur affiche le numéro de la question et le nombre restant : `Question X sur Y • N questions restantes`
- le champ de saisie est réinitialisé à chaque nouvelle question
- la validation du formulaire ne recharge plus la page
- la fin de partie est gérée proprement à la dernière question
- les scores sont enregistrés dans les cookies de navigation

## Utilisation

Le projet est statique : il fonctionne par simple ouverture du navigateur sur les fichiers HTML, sans serveur ni framework.

Exemple :

```bash
cd SeriousGame/quiz
# puis ouvrir index.html dans un navigateur
```

## Tests

Le projet inclut des tests Node qui couvrent les régressions importantes :

- gestion des cookies et du score
- progression du quiz
- fin de partie
- réinitialisation du champ de réponse
- validation clavier/bouton
- ordre de chargement des scripts dans les pages de jeu

Commande de validation :

```bash
cd quiz
npm test
```

ou directement :

```bash
cd quiz
node --test --test-reporter=spec
```

## Point d'amélioration retenu

Le projet privilégie une architecture légère et lisible, sans framework, mais avec une modularisation raisonnable :

- `core` pour la logique partagée
- `data` pour les contenus
- `games` pour les points d'entrée
- `html` pour les écrans

Cette approche garde le projet simple, maintenable et extensible sans introduire une complexité inutile.
