export default class Statuses {
  static getStatus(title) {
    if(title == "OPEN"){
      return "OPEN";
    } else if(title == "PROGRESS"){
      return "PROGRESS";
    } else if(title == "CLOSE"){
      return "CLOSE";
    }
  }
}
