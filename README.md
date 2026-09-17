# SeriousGame

Serious game de sensibilisation et de formation, construit autour de parcours de quiz en JavaScript statique.

## Vue d'ensemble

Le projet contient plusieurs modules de quiz :

- calcul
- QCM
- compréhension
- aide à domicile

L’objectif est de garder une structure simple et maintenable, sans framework ni build, tout en évitant la duplication de logique entre les différents jeux.

## Principe d'architecture

Le cœur du projet est centralisé dans le noyau partagé :

- `quiz/js/core/quiz-core.js`
- `quiz/js/core/cookie-storage.js`
- `quiz/js/core/quiz-engine.js`

Ce noyau gère :

- la création des questions et des quiz
- le rendu du DOM
- la progression entre questions
- le stockage et la lecture des scores dans les cookies
- la logique commune de fin de partie

Les jeux ne réécrivent plus leur logique métier de base : ils appellent le moteur partagé et ne se concentrent que sur leurs données et leur point d’entrée.

## Structure actuelle du dépôt

```text
SeriousGame/
├─ README.md
├─ .gitignore
├─ quiz/
│  ├─ index.html
│  ├─ score.html
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
│  │  │  ├─ cookie-storage.js
│  │  │  ├─ quiz-core.js
│  │  │  └─ quiz-engine.js
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
└─
```

## Règles de fonctionnement du projet

Les jeux partagent un comportement cohérent :

- le compteur affiche la progression en cours : `Question X sur Y • N questions restantes`
- la saisie est réinitialisée entre deux questions
- la soumission ne recharge plus la page par défaut
- la dernière question clôt proprement la partie
- le score est persisté dans les cookies pour les parcours concernés
- les pages HTML et leur script associé sont alignés sur des identifiants de conteneur cohérents

## Démarrage local

Le projet est pensé pour fonctionner sans serveur ni framework. Il suffit d’ouvrir les fichiers HTML dans un navigateur moderne.

Exemple :

```bash
cd SeriousGame/quiz
# puis ouvrir index.html dans le navigateur
```

## Tests de régression

Une suite Node est présente pour sécuriser les points sensibles du projet :

- gestion des cookies et du score
- progression du quiz
- fin de partie
- réinitialisation du champ de réponse
- validation via bouton et touche Entrée
- vérification du chargement du noyau partagé
- contrats HTML/JS des jeux du parcours

Pour lancer les tests :

```bash
cd quiz
npm test
```

ou directement :

```bash
cd quiz
node --test --test-reporter=spec
```

## Choix d'architecture retenu

Le projet privilégie une architecture légère et lisible, sans framework :

- `core` : moteur partagé et utilitaires communs
- `data` : données de quiz et contenus statiques
- `games` : points d’entrée des jeux
- `html` : écrans et feuilles de style associées

Cette approche garde le projet simple, maintenable et extensible sans introduire une complexité inutile ni dépendre d’un environnement de build lourd.

## État actuel

Le projet est en version stable pour un usage local statique, avec :

- un noyau partagé consolidé,
- des pages HTML alignées sur les scripts associés,
- un nettoyage des dépendances et du code mort,
- une couverture de tests sur les points de régression identifiés.
