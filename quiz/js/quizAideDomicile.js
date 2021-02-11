class Question {
    constructor(text, choices, answer,conseil) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}
let questions = [
    new Question("VOS DÉPLACEMENTS PRENNENT DE PLUS EN PLUS DE TEMPS DANS VOTRE ACTIVITÉ, VOUS VOUS DITES  ?", ["C’est normal, il faut bien se rendre chez les personnes que l’on aide", "Je vais diminuer ma pause déjeuner, je gagnerai du temps", "Je vais voir avec mon employeur comment mieux organiser mes déplacements"], "Je vais voir avec mon employeur comment mieux organiser mes déplacements","Inexact Mon activité est organisée en lien avec mon ou mes employeur(s) pour des déplacements en sécurité : planification de mes déplacements, de mes horaires, de ma pause déjeuner."),
    new Question("COMMENT PROCÉDEZ-VOUS POUR DÉPOUSSIÉRER LES SOLS ?", ["Je dépoussière les sols du fond de la pièce vers l’entrée avec un balai humide"," J’utilise un balai avec une pelle", "’utilise une serviette de bain humide avec une bassine", ], "Je dépoussière les sols du fond de la pièce vers l’entrée avec un balai humide"),
    new Question("AVANT DE COMMENCER VOTRE TRAVAIL, QUE FAITES-VOUS AU NIVEAU DE VOTRE TENUE VESTIMENTAIRE ?", ["J’adopte une tenue adaptée à mon travail" , " Je vérifie que mes vêtements de ville ne sont pas sales","Rien de particulier, je ne me change pas pour travailler"], "J’adopte une tenue adaptée à mon travail"),
    new Question("LA PERSONNE CHEZ QUI VOUS INTERVENEZ FUME EN VOTRE PRÉSENCE ET CELA VOUS GÊNE, QUE POUVEZ-VOUS FAIRE ?", [" J’ouvre la fenêtre pour aérer la pièce avant et pendant mon intervention.","Je travaille vite pour respirer le moins de fumée possible", "Je travaille vite pour respirer le moins de fumée possible"], "J’ouvre la fenêtre pour aérer la pièce avant et pendant mon intervention"),
    new Question("VOUS ACCOMPAGNEZ À TABLE UNE PERSONNE QUI A DES DIFFICULTÉS POUR SE DÉPLACER DANS UNE PIÈCE ENCOMBRÉE, QUE FAITES-VOUS ?", [" Je l’aide comme je peux à contourner les obstacles qui gênent la circulation", " J’organise la pièce au mieux pour faciliter l’accès à la table", "Rien de particulier, je la laisse se déplacer seule et je lui propose de porter un casque" ], " J’organise la pièce au mieux pour faciliter l’accès à la table"),
    new Question("VOUS UTILISEZ DES OBJETS TRANCHANTS ET COUPANTS, QUE VÉRIFIEZ-VOUS AU NIVEAU DE VOS VACCINATIONS ?", [" Je vérifie que je suis à jour de mes vaccinations contre la grippe et la tuberculose"," Je vérifie que je suis à jour de mes vaccinations contre le tétanos et l’hépatite B", "Je vérifie que je suis à jour de mes vaccinations contre la fièvre jaune et le paludisme"], "Je vérifie que je suis à jour de mes vaccinations contre le tétanos et l’hépatite B"),
    new Question("VOUS RÉCHAUFFEZ LE REPAS AU MICRO-ONDE, COMMENT VOUS ORGANISEZ-VOUS ?", [" J’utilise des plats et des assiettes adaptés à ce mode de cuisson"," Je fais chauffer le repas dans un récipient en métal", "Je fais chauffer le repas plus longtemps que le temps recommandé pour être sûr qu’il soit bien chaud"], " J’utilise des plats et des assiettes adaptés à ce mode de cuisson"),
    new Question("VOUS UTILISEZ DES OBJETS TRANCHANTS ET COUPANTS, QUE VÉRIFIEZ-VOUS AU NIVEAU DE VOS VACCINATIONS ?", [" Je vérifie que je suis à jour de mes vaccinations contre la grippe et la tuberculose"," Je vérifie que je suis à jour de mes vaccinations contre le tétanos et l’hépatite B", "Je vérifie que je suis à jour de mes vaccinations contre la fièvre jaune et le paludisme"], "Je vérifie que je suis à jour de mes vaccinations contre le tétanos et l’hépatite B"),
    new Question("VOUS RÉCHAUFFEZ LE REPAS AU MICRO-ONDE, COMMENT VOUS ORGANISEZ-VOUS ?", [" J’utilise des plats et des assiettes adaptés à ce mode de cuisson"," Je fais chauffer le repas dans un récipient en métal", "Je fais chauffer le repas plus longtemps que le temps recommandé pour être sûr qu’il soit bien chaud"], " J’utilise des plats et des assiettes adaptés à ce mode de cuisson"),
    new Question("VOUS CUISINEZ DANS UNE PIÈCE ENCOMBRÉE, COMMENT VOUS ORGANISEZ-VOUS ? ", ["  Je mets de la musique pour éviter d’y penser   "," J’enjambe les obstacles qui gênent ma circulation dans la cuisine", " Je limite mes déplacements et je choisis un plan de travail, par exemple la table de cuisine que je vais désencombrer avant de cuisiner"], "  Je limite mes déplacements et je choisis un plan de travail, par exemple la table de cuisine que je vais désencombrer avant de cuisiner"),
    new Question("LA PERSONNE QUE VOUS AIDEZ VOUS DEMANDE D’UTILISER UN ASPIRATEUR DONT LE FIL EST DÉNUDÉ, QUE FAITES-VOUS ? ", ["  Je le répare avec un rouleau de scotch"," Je ne l’utilise pas", " Rien de particulier, je fais mon travail"], " Je ne l’utilise pas"),
    new Question("VOUS AIDEZ UNE PERSONNE À S’HABILLER ET À SE CHAUSSER, COMMENT VOUS ORGANISEZ-VOUS ?", ["  Je prépare les vêtements et chaussures à l’avance que je pose près de la personne"," Je lui demande ce qu’elle veut porter et je vais chercher les affaires au fur et à mesure", " Je lui demande si elle ne préfère pas rester en pyjama aujourd’hui et lire un bon bouquin"], " Je prépare les vêtements et chaussures à l’avance que je pose près de la personne "),
    new Question("VOUS ÊTES AU CONTACT DE LINGE SALE ET DE PROTECTIONS SOUILLÉES, COMMENT VOUS PROTÉGEZ-VOUS ? ", [" Je fais attention à ne pas me sali"," Je porte une blouse et des gants", " Je porte des vêtements de ville que je peux nettoyer facilement"], " Je porte une blouse et des gants"),
    new Question("POUR FAIRE LE MÉNAGE, VOUS PORTEZ  ?", [" Une blouse et des gants de ménage à manchettes"," Un petit tablier pour protéger mes vêtements", " Rien de particulier, je travaille en tenue de ville"], " Une blouse et des gants de ménage à manchettes"),
    new Question("LA SALLE DE BAIN EST ENCOMBRÉE, VOUS RISQUEZ DE TOMBER, QUE POUVEZ-VOUS FAIRE ?  ", [" Je pousse tout ce qui gêne mes déplacements et j’ôte les petits tapis pour éviter de tomber","  Je fais quelques mouvements d’assouplissement pour me préparer à enjamber les obstacles", "Je porte des vêtements confortables et larges qui ne seront pas déchirés en cas de chute"], "Je pousse tout ce qui gêne mes déplacements et j’ôte les petits tapis pour éviter de tomber")
];

class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

const display = {
    elementShown: function(id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    endQuiz: function() {
        endQuizHTML = `
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
      
      <a href ="index.html"> Retour à la page d'accueil </p>`;

        aideDomicileHtml=`
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
       <br>  
       <h2> votre score vous permet d'être un aide domicile</h2>
       <br>
       <a href ="https://www.shiva.fr/formulaire-recrutement?gclid=CjwKCAiAr6-ABhAfEiwADO4sfXoGd7MVDTGSXRl6HcE4w-OpB9px8vfvfTLszq2nrxIrdQ5j1hlg4RoCiEgQAvD_BwE"> Rejoignez nos équipes d’aides a domicile  </p>
       <a href ="index.html"> Retour à la page d'accueil </p>`;

        if(quiz.score >= 2) {
            this.elementShown("quiz", aideDomicileHtml)
        } else{
        this.elementShown("quiz", endQuizHTML);}
    },
    question: function() {
        this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
        let choices = quiz.getCurrentQuestion().choices;

        guessHandler = (id, guess) => {
            document.getElementById(id).onclick = function() {
                quiz.guess(guess);
                quizApp();
            }
        }
        // affichage choix + prise en compte du choix
        for(let i = 0; i < choices.length; i++) {
            this.elementShown("choice" + i, choices[i]);
            guessHandler("guess" + i, choices[i]);
        }
    },
    progress: function() {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
};

// Game logic
quizApp = () => {
    if (quiz.hasEnded()) {
        display.endQuiz();
    } else {
        display.question();
        display.choices();
        display.progress();
    }
}
// Create Quiz
let quiz = new Quiz(questions);
quizApp();
