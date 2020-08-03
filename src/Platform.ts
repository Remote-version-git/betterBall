/**
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {
  getRank(): Promise<any>;
  addJifen(score): Promise<any>;
}

class DebugPlatform implements Platform {
  async addJifen(score) {
    if (!(window.playerInfo && window.playerInfo.openid)) return;
    var key = "zxdqw";
    var timestamp = Date.now();
    var sign = md5.hex(`${key}openid${window.playerInfo.openid}score${score}${timestamp}`);
    return this._request(
      `https://xwfintech.qingke.io/openapi/pinball/add/measy?key=${key}&sign=${sign}&openid=${window.playerInfo.openid}&score=${score}&timestamp=${timestamp}`
    );
  }
  async getRank() {
    return this._request(
      "https://xwfintech.qingke.io/_api/5f195b8dc01e13002c2d7341/openapi/pinball/list?pageSize=100"
    );
  }
  async _request(url) {
    return new Promise((ok, err) => {
      var request = new egret.HttpRequest();
      request.responseType = egret.HttpResponseType.TEXT;
      request.open(url, egret.HttpMethod.GET);
      request.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      request.send();
      request.addEventListener(
        egret.Event.COMPLETE,
        (e) => {
          var request = e.currentTarget;
          ok(request.response);
        },
        this
      );
      request.addEventListener(egret.IOErrorEvent.IO_ERROR, err, this);
      request.addEventListener(egret.ProgressEvent.PROGRESS, (e) => {}, this);
    });
  }
}

if (!window.platform) {
  window.platform = new DebugPlatform();
}

declare let platform: Platform;

declare interface Window {
  platform: Platform;
  playerInfo: {
    city: "",
    country: "",
    headimgurl: "";
    language: "",
    nickname: "",
    openid: "",
    privilege: "",
    province: "",
    sex: 1,
    success: true,
  };
}
