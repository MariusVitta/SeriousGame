(function () {
  if (!window.QuizCore || typeof window.QuizCore.createQuizPage !== 'function') {
    return;
  }

  const questions = [
    new window.QuizCore.Question('Complétez avec la bonne conjugaison : La souris est mang__ par le chat.', ['manger', 'mangée', 'mangé', 'mangés'], 'mangée'),
    new window.QuizCore.Question("Cherchez l'intrus.", ['fourmi', 'cigale', 'araignée', 'sauterelle'], 'araignée'),
    new window.QuizCore.Question("Quelle est l'erreur dans cette phrase : Maître corbeau sur un arbre perché tenais en son bec un fromage.", ['corbeauX', 'tenaiT', 'perchER', 'sonT'], 'tenaiT'),
    new window.QuizCore.Question('Lequel de ces mots est un palindrome ?', ['rêver', 'oiseau', 'Laval', 'radar'], 'radar'),
  ];

  window.QuizCore.createQuizPage({
    questions,
    rootId: 'fin',
    resultCookieName: 'scoreQCM',
    finalView: (currentQuiz) => `
      <h1>Quiz terminé !</h1>
      <h3> Votre score est de : ${currentQuiz.score} / ${currentQuiz.questions.length}</h3>
      <a href="../index.html"> Retour à la page d'accueil </a>
    `,
  });
}());
