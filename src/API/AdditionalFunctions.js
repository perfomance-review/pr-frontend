export default class AdditionalFunction {
  static formatDate(date) {
    return new Date(date).toLocaleDateString('ru-RU');
  }

  static countPollTime(questionsCount, respondentsCount) {
    let d = questionsCount * ((respondentsCount * (respondentsCount - 1)) / 2) * 5;
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    if (s > 0) {
      m = m + 1;
    }

    function getMinutes(m) {
      if (m % 10 == 0 || (m % 10 >= 5 && m % 10 <= 9) || (m % 100 >= 11 && m % 100 <= 14)) {
        return ' минут ';
      } else if (m % 10 == 1) {
        return ' минуту ';
      } else {
        return ' минуты ';
      }
    }

    function getHours(h) {
      if (h % 10 == 0 || (h % 10 >= 5 && h % 10 <= 9) || (h % 100 >= 11 && h % 100 <= 14)) {
        return ' часов ';
      } else if (h % 10 == 1) {
        return ' час ';
      } else {
        return ' часа ';
      }
    }

    let hDisplay = h > 0 ? h + getHours(h) : '';
    let mDisplay = m > 0 ? m + getMinutes(m) : '';

    return hDisplay + mDisplay;
  }
}
