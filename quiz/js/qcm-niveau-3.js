(function () {
  const questions = [
    new window.QuizCore.Question("Quelle est l'orthographe exacte ?", ["acétylsalycilique", "acétilsalicylique", "acétilsalycilique", "acétylsalicylique"], "acétylsalicylique"),
    new window.QuizCore.Question("Qu'est-ce qu'un lagopède ?", ["un rongeur", "un oiseau", "un batracien", "un insecte"], "un oiseau"),
    new window.QuizCore.Question("Complétez la phrase : Je voulais que tu lui __ bonjour avant de prendre ton repas.", ["aies dit", "dises", "eusses dit", "disasses"], "eusses dit"),
    new window.QuizCore.Question("Comment s'écrit le nombre 894 ?", ["Huit cent quatre-vingt-quatorze", "Huit cents quatre-vingt-quatorze", "Huit cent quatre-vingt quatorze", "Huit cents quatre-vingt quatorze"], "Huit cent quatre-vingt-quatorze")
  ];

  window.QuizCore.createQuizPage({
    questions,
    rootId: 'quiz',
    resultCookieName: 'scoreQCM',
    finalView: (currentQuiz) => `
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${currentQuiz.score} / ${currentQuiz.questions.length}</h3>
      <a href="../index.html"> Retour à la page d'accueil </a>
    `,
  });
}());