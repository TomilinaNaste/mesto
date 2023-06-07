export default class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.profileTitleSelector);
    this._profileJob = document.querySelector(
      configInfo.profileSubtitleSelector
    );
  }

  gerUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.job;
  }
}
