export default class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.profileTitleSelector);
    this._profileJob = document.querySelector(
      configInfo.profileSubtitleSelector
    );
    this._profileAvatar = document.querySelector(configInfo.profileAvatar);
  }

  gerUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

//прин и добавляет на страницу новые данные от пользователя
  setUserInfo({job, name, avatar}) {
    this._profileAvatar.src = avatar
    this._profileName.textContent = name
    this._profileJob.textContent = job;
  }

  setId(id){
    this._id = id;
  }

  getId(){
    return this._id
  }
}


