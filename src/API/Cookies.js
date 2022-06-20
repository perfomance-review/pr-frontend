export default class Cookies {
  static getCookie(cookieName) {
    const results = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)');
    if (results) return unescape(results[2]);
    else return null;
  }

  static deleteCookie(cookieName, cookieValue) {
    document.cookie = cookieName + '=' + cookieValue + ';max-age=-1';
  }

  static setCookie(cookieName, cookieValue) {
    document.cookie = cookieName + '=' + cookieValue;
  }
}
