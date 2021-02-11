class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}
let questions = [
    new Question("Maître Corbeau, sur un arbre perché,<br>Tenait en son bec un fromage.<br>Maître Renard, par l’odeur alléché,<br>Lui tint à peu près ce langage :<br>« Hé ! bonjour, Monsieur du Corbeau.<br>Que vous êtes joli ! que vous me semblez beau !<br>Sans mentir, si votre ramage<br>Se rapporte à votre plumage,<br>Vous êtes le Phénix des hôtes de ces bois. »<br>A ces mots le Corbeau ne se sent pas de joie ;<br>Et pour montrer sa belle voix,<br>Il ouvre un large bec, laisse tomber sa proie.<br>Le Renard s’en saisit, et dit : « Mon bon Monsieur,<br>Apprenez que tout flatteur<br>Vit aux dépens de celui qui l’écoute :<br>Cette leçon vaut bien un fromage, sans doute. »<br>Le Corbeau, honteux et confus,<br>Jura, mais un peu tard, qu’on ne l’y prendrait plus.<br>'Le corbeau et le renard' Jean de la Fontaine</br><br><br>  Qui s'est fait avoir dans l'histoire ?", ["Le renard", "Le corbeau", "Aucun des deux","On ne peut pas savoir"],"Le corbeau" ),
    new Question("Maître Corbeau, sur un arbre perché,<br>Tenait en son bec un fromage.<br>Maître Renard, par l’odeur alléché,<br>Lui tint à peu près ce langage :<br>« Hé ! bonjour, Monsieur du Corbeau.<br>Que vous êtes joli ! que vous me semblez beau !<br>Sans mentir, si votre ramage<br>Se rapporte à votre plumage,<br>Vous êtes le Phénix des hôtes de ces bois. »<br>A ces mots le Corbeau ne se sent pas de joie ;<br>Et pour montrer sa belle voix,<br>Il ouvre un large bec, laisse tomber sa proie.<br>Le Renard s’en saisit, et dit : « Mon bon Monsieur,<br>Apprenez que tout flatteur<br>Vit aux dépens de celui qui l’écoute :<br>Cette leçon vaut bien un fromage, sans doute. »<br>Le Corbeau, honteux et confus,<br>Jura, mais un peu tard, qu’on ne l’y prendrait plus.<br>'Le corbeau et le renard' Jean de la Fontaine</br><br><br>  Quelle ruse a utilisé le renard ?", ["La flatterie", "La distraction", "La pression","Le mensonge"],"La flatterie" ),
    new Question("Maître Corbeau, sur un arbre perché,<br>Tenait en son bec un fromage.<br>Maître Renard, par l’odeur alléché,<br>Lui tint à peu près ce langage :<br>« Hé ! bonjour, Monsieur du Corbeau.<br>Que vous êtes joli ! que vous me semblez beau !<br>Sans mentir, si votre ramage<br>Se rapporte à votre plumage,<br>Vous êtes le Phénix des hôtes de ces bois. »<br>A ces mots le Corbeau ne se sent pas de joie ;<br>Et pour montrer sa belle voix,<br>Il ouvre un large bec, laisse tomber sa proie.<br>Le Renard s’en saisit, et dit : « Mon bon Monsieur,<br>Apprenez que tout flatteur<br>Vit aux dépens de celui qui l’écoute :<br>Cette leçon vaut bien un fromage, sans doute. »<br>Le Corbeau, honteux et confus,<br>Jura, mais un peu tard, qu’on ne l’y prendrait plus.<br>'Le corbeau et le renard' Jean de la Fontaine</br><br><br>  Quelle qualité du corbeau est mise en avant par le renard ?", ["Sa beauté", "Son intelligence", "Son chant","Sa popularité"],"Son chant" ),
    new Question("Maître Corbeau, sur un arbre perché,<br>Tenait en son bec un fromage.<br>Maître Renard, par l’odeur alléché,<br>Lui tint à peu près ce langage :<br>« Hé ! bonjour, Monsieur du Corbeau.<br>Que vous êtes joli ! que vous me semblez beau !<br>Sans mentir, si votre ramage<br>Se rapporte à votre plumage,<br>Vous êtes le Phénix des hôtes de ces bois. »<br>A ces mots le Corbeau ne se sent pas de joie ;<br>Et pour montrer sa belle voix,<br>Il ouvre un large bec, laisse tomber sa proie.<br>Le Renard s’en saisit, et dit : « Mon bon Monsieur,<br>Apprenez que tout flatteur<br>Vit aux dépens de celui qui l’écoute :<br>Cette leçon vaut bien un fromage, sans doute. »<br>Le Corbeau, honteux et confus,<br>Jura, mais un peu tard, qu’on ne l’y prendrait plus.<br>'Le corbeau et le renard' Jean de la Fontaine</br><br><br>  Qui symbolise le corbeau ?", ["Le peuple", "Les pauvres", "Les chanteurs","La haute autorité"],"La haute autorité" ),
    
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
      <a href ="../index.html"> Retour à la page d'accueil </p>`;
        this.elementShown("quiz", endQuizHTML);
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