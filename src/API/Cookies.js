export default class Cookies {
  static getCookie(cookieName) {
    const results = document.cookie.match('(^|;) ?' + cookieName + '=([^;]*)(;|$)');
    if (results) return unescape(results[2]);
    else return null;
  }

  static deleteCookie(cookieName) {
    document.cookie = cookieName + '=0' + '; path=/;max-age=-1';
  }

  static setCookie(cookieName, cookieValue) {
    document.cookie = cookieName + '=' + cookieValue + '; path=/';
  }
}
