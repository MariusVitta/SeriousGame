(function () {
  const CookieStorage = {
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

  window.QuizCore = window.QuizCore || {};
  window.QuizCore.CookieStorage = CookieStorage;
}());
