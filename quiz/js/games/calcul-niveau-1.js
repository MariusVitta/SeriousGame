(function () {
  if (window.QuizCore && typeof window.QuizCore.createCalculationQuiz === 'function') {
    window.QuizCore.createCalculationQuiz({
      totalQuestions: 4,
      min: 0,
      max: 10,
      resultCookieName: 'scoreCalcul',
      homeUrl: '../index.html',
    });
  }
}());
