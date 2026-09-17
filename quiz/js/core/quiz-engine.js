(function () {
  const CookieStorage = window.QuizCore ? window.QuizCore.CookieStorage : {
    setCookie(cname, cvalue) {
      document.cookie = cname + '=' + encodeURIComponent(cvalue) + ';path=/;';
    },
    reset(cname) {
      document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    },
    getCookie(cname) {
      const name = cname + '=';
      const ca = document.cookie.split(';');

      for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return decodeURIComponent(c.substring(name.length, c.length));
        }
      }

      return '';
    },
    testExistence(cname) {
      return document.cookie.split(';').some((item) => item.trim().startsWith(cname + '='));
    },
    appendValue(cname, concatValue) {
      const currentValue = CookieStorage.getCookie(cname);
      const nextValue = currentValue ? `${currentValue}/${concatValue}` : String(concatValue);
      CookieStorage.reset(cname);
      CookieStorage.setCookie(cname, nextValue);
    },
    saveScore(cname, cvalue) {
      if (!CookieStorage.testExistence(cname)) {
        CookieStorage.setCookie(cname, cvalue);
        return;
      }

      CookieStorage.appendValue(cname, cvalue);
    },
  };

  class Question {
    constructor(text, choices, answer, conseil = '') {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
      this.conseil = conseil;
    }

    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }

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
        this.score += 1;
      }
      this.currentQuestionIndex += 1;
    }

    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }

  function createRenderer({ rootId, questionId = 'question', progressId = 'progress', scoreId = 'score', choicePrefix = 'choice', guessPrefix = 'guess', onAnswer }) {
    const elementShown = (id, text) => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = text;
      }
    };

    return {
      elementShown,
      question(quiz) {
        elementShown(questionId, quiz.getCurrentQuestion().text);
      },
      choices(quiz) {
        const choices = quiz.getCurrentQuestion().choices;
        for (let i = 0; i < choices.length; i += 1) {
          const choiceId = `${choicePrefix}${i}`;
          const guessId = `${guessPrefix}${i}`;
          const choice = choices[i];
          elementShown(choiceId, choice);
          const guessButton = document.getElementById(guessId);
          if (guessButton) {
            guessButton.onclick = () => {
              quiz.guess(choice);
              onAnswer();
            };
          }
        }
      },
      progress(quiz) {
        const currentQuestionNumber = quiz.currentQuestionIndex + 1;
        const remainingQuestions = Math.max(quiz.questions.length - currentQuestionNumber, 0);
        const remainingLabel = remainingQuestions === 0 ? 'Dernière question' : `${remainingQuestions} question${remainingQuestions > 1 ? 's' : ''} restante${remainingQuestions > 1 ? 's' : ''}`;
        elementShown(progressId, `Question ${currentQuestionNumber} sur ${quiz.questions.length} • ${remainingLabel}`);
      },
      score(quiz) {
        elementShown(scoreId, `Score : ${quiz.score}`);
      },
      endQuiz(quiz, finalHtml) {
        const root = document.getElementById(rootId);
        if (root) {
          root.innerHTML = finalHtml(quiz);
        }
      },
    };
  }

  function createQuizPage({
    questions,
    rootId = 'quiz',
    questionId = 'question',
    scoreId = 'score',
    progressId = 'progress',
    choicePrefix = 'choice',
    guessPrefix = 'guess',
    resultCookieName,
    finalView,
  }) {
    const quiz = new Quiz(questions);
    let display;

    const renderQuiz = () => {
      if (quiz.hasEnded()) {
        if (resultCookieName) {
          CookieStorage.saveScore(resultCookieName, quiz.score);
        }
        display.endQuiz(quiz, finalView || ((currentQuiz) => `
          <h1>Quiz terminé !</h1>
          <h3> Votre score est de : ${currentQuiz.score} / ${currentQuiz.questions.length}</h3>
          <a href="index.html"> Retour à la page d'accueil </a>
        `));
        return;
      }

      display.question(quiz);
      display.choices(quiz);
      display.progress(quiz);
      display.score(quiz);
    };

    display = createRenderer({
      rootId,
      questionId,
      scoreId,
      progressId,
      choicePrefix,
      guessPrefix,
      onAnswer: renderQuiz,
    });

    renderQuiz();
    return { quiz, renderQuiz };
  }

  function createCalculationQuiz({
    totalQuestions = 4,
    min = 0,
    max = 10,
    questionId = 'question',
    scoreId = 'score',
    progressId = 'progress',
    inputId = 'resultatBarre',
    submitId = 'bouton',
    resultId = 'resultat',
    resultCookieName = 'scoreCalcul',
    homeUrl = '../index.html',
  } = {}) {
    let score = 0;
    let currentQuestionIndex = 0;
    let currentAnswer = 0;

    const getElement = (id) => document.getElementById(id);
    const randomInt = (minValue, maxValue) => Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

    const updateScore = () => {
      const element = getElement(scoreId);
      if (element) {
        element.innerHTML = score;
      }
    };

    const updateProgress = () => {
      const element = getElement(progressId);
      if (!element) {
        return;
      }

      const currentQuestionNumber = currentQuestionIndex + 1;
      const remainingQuestions = Math.max(totalQuestions - currentQuestionNumber, 0);
      const remainingLabel = remainingQuestions === 0 ? 'Dernière question' : `${remainingQuestions} question${remainingQuestions > 1 ? 's' : ''} restante${remainingQuestions > 1 ? 's' : ''}`;
      element.innerHTML = `Question ${currentQuestionNumber} sur ${totalQuestions} • ${remainingLabel}`;
    };

    const resetInput = () => {
      const input = getElement(inputId);
      if (input) {
        input.value = '';
      }
    };

    const generateQuestion = () => {
      let firstNumber = randomInt(min, max);
      let secondNumber = randomInt(min, max);
      const operators = ['+', '-', '*', '/'];
      const operator = operators[Math.floor(Math.random() * operators.length)];

      if (operator === '/') {
        firstNumber = randomInt(min, max);
        secondNumber = randomInt(Math.max(1, min), max);
        while (firstNumber < 2 * secondNumber) {
          secondNumber = randomInt(Math.max(1, min), max);
        }
      }

      let computedValue = 0;
      switch (operator) {
        case '/':
          computedValue = firstNumber / secondNumber;
          break;
        case '*':
          computedValue = firstNumber * secondNumber;
          break;
        case '-':
          computedValue = firstNumber - secondNumber;
          break;
        default:
          computedValue = firstNumber + secondNumber;
      }

      currentAnswer = computedValue;
      const questionElement = getElement(questionId);
      if (questionElement) {
        questionElement.innerHTML = `${firstNumber}${operator}${secondNumber}`;
      }

      const resultElement = getElement(resultId);
      if (resultElement) {
        resultElement.innerHTML = '';
      }

      resetInput();
    };

    const finishGame = () => {
      if (resultCookieName) {
        CookieStorage.saveScore(resultCookieName, score);
      }

      const button = getElement(submitId);
      if (button) {
        button.disabled = true;
      }

      const endElement = getElement('fin');
      if (endElement) {
        endElement.innerHTML = `<a href="${homeUrl}">retourner au menu principal</a>`;
      }
    };

    const submitAnswer = () => {
      const input = getElement(inputId);
      const resultElement = getElement(resultId);
      const userAnswer = Number((input ? input.value.trim() : ''));
      const isCorrectAnswer = !Number.isNaN(userAnswer) && Number(userAnswer) === Number(currentAnswer);

      if (resultElement) {
        resultElement.innerHTML = isCorrectAnswer ? 'Bonne réponse' : 'mauvaise réponse';
      }

      if (isCorrectAnswer) {
        score += 1;
        updateScore();
      }

      if (currentQuestionIndex >= totalQuestions - 1) {
        finishGame();
        return;
      }

      currentQuestionIndex += 1;
      updateProgress();
      generateQuestion();
    };

    const button = getElement(submitId);
    const form = document.querySelector('form');

    if (button) {
      button.onclick = () => {
        if (!button.disabled) {
          submitAnswer();
        }
      };
    }

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (button && !button.disabled) {
          button.click();
        }
      });
    }

    updateScore();
    updateProgress();
    generateQuestion();

    return {
      getCurrentAnswer() {
        return currentAnswer;
      },
      getCurrentQuestionIndex() {
        return currentQuestionIndex;
      },
    };
  }

  window.QuizCore = window.QuizCore || {};
  window.QuizCore.Question = Question;
  window.QuizCore.Quiz = Quiz;
  window.QuizCore.CookieStorage = CookieStorage;
  window.QuizCore.createQuizPage = createQuizPage;
  window.QuizCore.createCalculationQuiz = createCalculationQuiz;
}());
