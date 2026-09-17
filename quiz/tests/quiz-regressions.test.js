const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function createElement(id, overrides = {}) {
  return {
    id,
    innerHTML: '',
    value: '',
    disabled: false,
    listeners: {},
    onclick: null,
    click() {
      if (typeof this.onclick === 'function') {
        this.onclick();
      }
    },
    addEventListener(type, handler) {
      this.listeners[type] = handler;
    },
    ...overrides,
  };
}

function createDocument(elements = {}) {
  const map = new Map(Object.entries(elements));
  const document = {
    _cookies: {},
    getElementById(id) {
      return map.get(id) || null;
    },
    querySelector(selector) {
      if (selector === 'form') {
        return map.get('form') || null;
      }
      return null;
    },
    get cookie() {
      return Object.entries(this._cookies)
        .filter(([, value]) => value !== null)
        .map(([name, value]) => `${name}=${value}`)
        .join('; ');
    },
    set cookie(value) {
      const cookie = String(value).trim();
      if (!cookie) {
        return;
      }

      const token = cookie.split(';')[0];
      const separatorIndex = token.indexOf('=');
      if (separatorIndex === -1) {
        return;
      }

      const name = token.slice(0, separatorIndex).trim();
      const rawValue = token.slice(separatorIndex + 1).trim();
      if (rawValue === '' || cookie.includes('expires=')) {
        delete this._cookies[name];
        return;
      }

      this._cookies[name] = rawValue;
    },
  };

  return document;
}

function loadScript(filePath, document, customWindow = {}) {
  const source = fs.readFileSync(filePath, 'utf8');
  const context = {
    console,
    document,
    window: customWindow,
    Math,
    setTimeout,
    clearTimeout,
  };
  context.global = context;
  vm.runInNewContext(source, context);
  return context;
}

function extractHtmlIds(html) {
  return [...html.matchAll(/id=(?:"|')([^"']+)(?:"|')/g)].map((match) => match[1]);
}

test('CookieStorage.saveScore ajoute la valeur au cookie existant', () => {
  const document = createDocument();
  const windowObject = {};
  const context = loadScript(path.join(__dirname, '..', 'js', 'core', 'quiz-core.js'), document, windowObject);

  document.cookie = 'score=5';
  context.window.QuizCore.CookieStorage.saveScore('score', 8);

  assert.equal(document.cookie, 'score=5%2F8');
});

test('createQuizPage avance correctement et garde le score', () => {
  const questionOne = { text: '1 + 1 ?', choices: ['2', '3'], answer: '2' };
  const questionTwo = { text: '2 + 2 ?', choices: ['3', '4'], answer: '4' };
  const elements = {
    quiz: createElement('quiz'),
    question: createElement('question'),
    progress: createElement('progress'),
    score: createElement('score'),
    choice0: createElement('choice0'),
    choice1: createElement('choice1'),
    guess0: createElement('guess0'),
    guess1: createElement('guess1'),
  };

  const document = createDocument(elements);
  const windowObject = {};
  const context = loadScript(path.join(__dirname, '..', 'js', 'core', 'quiz-core.js'), document, windowObject);

  const { Question, createQuizPage } = context.window.QuizCore;
  const quizPage = createQuizPage({
    questions: [new Question(questionOne.text, questionOne.choices, questionOne.answer), new Question(questionTwo.text, questionTwo.choices, questionTwo.answer)],
    rootId: 'quiz',
    questionId: 'question',
    scoreId: 'score',
    progressId: 'progress',
    choicePrefix: 'choice',
    guessPrefix: 'guess',
  });

  assert.equal(elements.question.innerHTML, '1 + 1 ?');
  assert.equal(elements.progress.innerHTML.includes('Question 1 sur 2'), true);

  elements.guess0.onclick();

  assert.equal(quizPage.quiz.score, 1);
  assert.equal(elements.question.innerHTML, '2 + 2 ?');
  assert.equal(elements.progress.innerHTML.includes('Question 2 sur 2'), true);
});

test('createCalculationQuiz reset le champ et bloque la dernière question proprement', () => {
  const elements = {
    question: createElement('question'),
    score: createElement('score'),
    progress: createElement('progress'),
    resultat: createElement('resultat'),
    fin: createElement('fin'),
    bouton: createElement('bouton', { value: 'Valider' }),
    resultatBarre: createElement('resultatBarre', { value: '42' }),
    form: createElement('form'),
  };

  const document = createDocument(elements);
  const windowObject = {};
  loadScript(path.join(__dirname, '..', 'js', 'core', 'quiz-core.js'), document, windowObject);

  const { createCalculationQuiz } = windowObject.QuizCore;
  const quiz = createCalculationQuiz({
    totalQuestions: 4,
    min: 0,
    max: 10,
    resultCookieName: 'scoreCalcul',
    homeUrl: '../index.html',
  });

  assert.equal(elements.resultatBarre.value, '');
  assert.equal(typeof elements.form.listeners.submit, 'function');

  elements.resultatBarre.value = String(quiz.getCurrentAnswer());
  elements.bouton.onclick();

  assert.equal(elements.bouton.disabled, false);

  for (let i = 1; i < 4; i += 1) {
    elements.resultatBarre.value = '0';
    elements.bouton.onclick();
  }

  assert.equal(elements.bouton.disabled, true);
  assert.match(elements.fin.innerHTML, /retourner au menu principal/);

  elements.form.listeners.submit({ preventDefault() {} });
  assert.equal(elements.bouton.disabled, true);
});

test('les pages de jeu chargent le noyau partagé avant le script de jeu', () => {
  const filePaths = [
    path.join(__dirname, '..', 'html', 'calcul-niveau-1.html'),
    path.join(__dirname, '..', 'html', 'qcm-niveau-1.html'),
  ];

  filePaths.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /quiz-core\.js/);
    assert.doesNotMatch(content, /type="module"/);
    assert.ok(content.indexOf('quiz-core.js') < content.indexOf('games/'));
  });
});

test('les jeux QCM ciblent bien le conteneur final fin', () => {
  const filePaths = [
    path.join(__dirname, '..', 'js', 'qcm-niveau-2.js'),
    path.join(__dirname, '..', 'js', 'qcm-niveau-3.js'),
  ];

  filePaths.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    assert.match(content, /rootId:\s*'fin'/);
  });
});

test('le contrat HTML/JS est cohérent pour les jeux du parcours', () => {
  const cases = [
    {
      name: 'QCM niveau 1',
      htmlPath: path.join(__dirname, '..', 'html', 'qcm-niveau-1.html'),
      jsPath: path.join(__dirname, '..', 'js', 'games', 'qcm-niveau-1.js'),
      rootId: 'fin',
      requiredIds: ['question', 'score', 'progress', 'guess0', 'guess1', 'guess2', 'guess3', 'choice0', 'choice1', 'choice2', 'choice3'],
    },
    {
      name: 'QCM niveau 2',
      htmlPath: path.join(__dirname, '..', 'html', 'qcm-niveau-2.html'),
      jsPath: path.join(__dirname, '..', 'js', 'qcm-niveau-2.js'),
      rootId: 'fin',
      requiredIds: ['question', 'score', 'progress', 'guess0', 'guess1', 'guess2', 'guess3', 'choice0', 'choice1', 'choice2', 'choice3'],
    },
    {
      name: 'QCM niveau 3',
      htmlPath: path.join(__dirname, '..', 'html', 'qcm-niveau-3.html'),
      jsPath: path.join(__dirname, '..', 'js', 'qcm-niveau-3.js'),
      rootId: 'fin',
      requiredIds: ['question', 'score', 'progress', 'guess0', 'guess1', 'guess2', 'guess3', 'choice0', 'choice1', 'choice2', 'choice3'],
    },
    {
      name: 'Calcul niveau 1',
      htmlPath: path.join(__dirname, '..', 'html', 'calcul-niveau-1.html'),
      jsPath: path.join(__dirname, '..', 'js', 'games', 'calcul-niveau-1.js'),
      rootId: 'quiz',
      requiredIds: ['question', 'score', 'progress', 'resultatBarre', 'bouton', 'resultat', 'fin'],
    },
    {
      name: 'Calcul niveau 2',
      htmlPath: path.join(__dirname, '..', 'html', 'calcul-niveau-2.html'),
      jsPath: path.join(__dirname, '..', 'js', 'calcul-niveau-2.js'),
      rootId: 'quiz',
      requiredIds: ['question', 'score', 'progress', 'resultatBarre', 'bouton', 'resultat', 'fin'],
    },
    {
      name: 'Calcul niveau 3',
      htmlPath: path.join(__dirname, '..', 'html', 'calcul-niveau-3.html'),
      jsPath: path.join(__dirname, '..', 'js', 'calcul-niveau-3.js'),
      rootId: 'quiz',
      requiredIds: ['question', 'score', 'progress', 'resultatBarre', 'bouton', 'resultat', 'fin'],
    },
    {
      name: 'Compréhension niveau 1',
      htmlPath: path.join(__dirname, '..', 'html', 'comprehension-niveau-1.html'),
      jsPath: path.join(__dirname, '..', 'js', 'comprehension-niveau-1.js'),
      rootId: 'quiz',
      requiredIds: ['question', 'score', 'progress', 'guess0', 'guess1', 'guess2', 'guess3', 'choice0', 'choice1', 'choice2', 'choice3'],
    },
    {
      name: 'Compréhension niveau 2',
      htmlPath: path.join(__dirname, '..', 'html', 'comprehension-niveau-2.html'),
      jsPath: path.join(__dirname, '..', 'js', 'comprehension-niveau-2.js'),
      rootId: 'quiz',
      requiredIds: ['question', 'score', 'progress', 'guess0', 'guess1', 'guess2', 'guess3', 'choice0', 'choice1', 'choice2', 'choice3'],
    },
    {
      name: 'Compréhension niveau 3',
      htmlPath: path.join(__dirname, '..', 'html', 'comprehension-niveau-3.html'),
      jsPath: path.join(__dirname, '..', 'js', 'comprehension-niveau-3.js'),
      rootId: 'quiz',
      requiredIds: ['question', 'score', 'progress', 'guess0', 'guess1', 'guess2', 'guess3', 'choice0', 'choice1', 'choice2', 'choice3'],
    },
    {
      name: 'Aide à domicile',
      htmlPath: path.join(__dirname, '..', 'aide-domicile.html'),
      jsPath: path.join(__dirname, '..', 'js', 'aide-domicile.js'),
      rootId: 'quiz',
      requiredIds: ['question', 'score', 'progress', 'guess0', 'guess1', 'guess2', 'choice0', 'choice1', 'choice2'],
    },
  ];

  cases.forEach(({ name, htmlPath, jsPath, rootId, requiredIds }) => {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const js = fs.readFileSync(jsPath, 'utf8');
    const ids = extractHtmlIds(html);

    assert.ok(ids.includes(rootId), `${name}: l'élément racine ${rootId} est absent du HTML`);
    requiredIds.forEach((id) => {
      assert.ok(ids.includes(id), `${name}: l'élément ${id} est absent du HTML`);
    });

    const scriptSources = [...html.matchAll(/<script[^>]*src=["']([^"']+)["'][^>]*>/g)].map((match) => match[1]);
    assert.ok(scriptSources.some((src) => src.endsWith(path.basename(jsPath))), `${name}: le script JS attendu n'est pas chargé par le HTML`);

    if (rootId === 'fin') {
      assert.match(js, /rootId\s*:\s*['"]fin['"]/u, `${name}: le script ne cible pas le conteneur final attendu`);
    } else {
      assert.ok(/createCalculationQuiz\s*\(/.test(js) || /rootId\s*:\s*['"]quiz['"]/u.test(js), `${name}: le script ne cible pas le conteneur principal attendu`);
    }
  });
});
