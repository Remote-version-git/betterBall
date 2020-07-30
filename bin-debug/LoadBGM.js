var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// 播放声音
var LoadBGM = (function () {
    function LoadBGM() {
        // // 是否播放了音乐, 默认不播放
        this._isPlay = false;
        this._sound = RES.getRes("bgm_mp3");
    }
    LoadBGM.getInstance = function () {
        if (this.LoadBGM === null) {
            LoadBGM.LoadBGM = new LoadBGM();
        }
        return LoadBGM.LoadBGM;
    };
    // // 获取播放状态
    LoadBGM.prototype.getPlayStatus = function () {
        return this._isPlay;
    };
    LoadBGM.prototype.setPlayStatus = function (v) {
        this._isPlay = v;
    };
    LoadBGM.prototype.getChannel = function () {
        return this._channel;
    };
    // 停止音乐
    LoadBGM.prototype.stopBGM = function () {
        if (this._isPlay) {
            this._channel && this._channel.stop();
            this._isPlay = false;
            this.prePlayStatus = true;
        }
    };
    // 播放音乐
    LoadBGM.prototype.playBGM = function () {
        if (!this._isPlay) {
            this._channel = this._sound.play();
            this._isPlay = true;
            this.prePlayStatus = false;
        }
    };
    // // 切换音乐
    LoadBGM.prototype.SwitchPlay = function () {
        if (!this._isPlay) {
            // 播放音乐
            this._channel = this._sound.play();
            this._isPlay = true;
        }
        else {
            // 停止音乐
            this._channel && this._channel.stop();
            this._isPlay = false;
        }
    };
    LoadBGM.LoadBGM = null;
    return LoadBGM;
}());
__reflect(LoadBGM.prototype, "LoadBGM");
