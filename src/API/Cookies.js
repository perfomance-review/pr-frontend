export default class Cookies {
    static getCookie(cookieName) {
      const results = document.cookie.match ( '(^|;) ?' + cookieName + '=([^;]*)(;|$)' );
      if ( results )
        return ( unescape ( results[2] ) );
      else
        return null;
    }
}